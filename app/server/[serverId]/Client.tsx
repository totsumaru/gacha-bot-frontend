"use client"

import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GachaReq, GachaRes } from "@/utils/api/body";
import { uploadImages } from "@/utils/api/upload_images";
import { upsertGacha } from "@/utils/api/upsert_gacha";
import { useOpenStore, usePanelStore, useResultStore, useRoleStore } from "@/utils/store/gachaStore";

type Props = {
  accessToken: string
  gachaRes: GachaRes
}

/**
 * クライアントの処理を行います
 */
export default function Client({ gachaRes, accessToken }: Props) {
  const panelStore = usePanelStore();
  const openStore = useOpenStore();
  const resultStore = useResultStore();
  const roleStore = useRoleStore();

  useEffect(() => {
    panelStore.init(gachaRes.panel);
    openStore.init(gachaRes.open);
    resultStore.init(gachaRes.result);
    roleStore.init(gachaRes.roles);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // 確率の合計を計算
  const totalProbability = resultStore.results.reduce((total, res) => total + res.probability, 0);

  // バリデーションを行います
  const validate = () => {
    if (totalProbability !== 100) {
      throw new Error("確率の合計が100%ではありません");
    }
    // パネル
    if (panelStore.title.length > 256) {
      throw new Error("タイトルは256文字以内にしてください");
    }
    if (panelStore.description.length === 0) {
      throw new Error("メッセージが空の場所があります");
    }
    if (panelStore.description.length > 1500) {
      throw new Error("メッセージは1500文字以内にしてください");
    }
    // オープン
    if (openStore.title.length > 256) {
      throw new Error("タイトルは256文字以内にしてください");
    }
    if (openStore.description.length === 0) {
      throw new Error("メッセージが空の場所があります");
    }
    if (openStore.description.length > 1500) {
      throw new Error("メッセージは1500文字以内にしてください");
    }
    // リザルト
    resultStore.results.forEach((res) => {
      if (res.title.length > 256) {
        throw new Error(`タイトルは256文字以内にしてください`);
      }
      if (res.description.length === 0) {
        throw new Error(`メッセージが空の場所があります`);
      }
      if (res.description.length > 1500) {
        throw new Error(`メッセージは1500文字以内にしてください`);
      }
    });

    return true;
  }

  // 保存ボタンをクリックした時の処理です
  const handleSave = async () => {
    try {
      validate()
    } catch (error: any) {
      toast({
        title: error.message || "エラーが発生しました",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return
    }
    setIsLoading(true);

    try {
      // File型のみ画像をアップロード
      const imageFilesToUpload = [
        panelStore.image instanceof File ? panelStore.image : null,
        openStore.image instanceof File ? openStore.image : null,
        ...resultStore.results.map(res => res.image instanceof File ? res.image : null),
      ].filter(file => file !== null) as File[]; // File型のみの配列を保証

      let uploadedImageUrls: string[] = [];
      if (imageFilesToUpload.length !== 0) {
        uploadedImageUrls = await uploadImages({
            serverId: gachaRes.server_id,
            accessToken: accessToken,
            imageFiles: imageFilesToUpload
          }
        )
      }

      // アップロードされた画像のURLか、元のURLを使用
      const panelImageUrl = panelStore.image instanceof File ? uploadedImageUrls.shift() : panelStore.image;
      const openImageUrl = openStore.image instanceof File ? uploadedImageUrls.shift() : openStore.image;

      // APIリクエストに必要なデータを準備
      const requestData: GachaReq = {
        id: gachaRes.id,
        server_id: gachaRes.server_id,
        panel: {
          title: panelStore.title,
          description: panelStore.description,
          color: 0,
          image_url: panelImageUrl || "", // アップロードされたURLか元のURL
          thumbnail_url: "",
          button: [{
            kind: "to_open",
            label: panelStore.button.label,
            style: panelStore.button.style,
          }],
        },
        open: {
          title: openStore.title,
          description: openStore.description,
          color: 0,
          image_url: openImageUrl || "", // アップロードされたURLか元のURL
          thumbnail_url: "",
          button: [{
            kind: "to_result",
            label: openStore.button.label,
            style: openStore.button.style,
          }],
        },
        result: resultStore.results.map((res) => {
          const imageUrl = res.image instanceof File ? uploadedImageUrls.shift() : res.image;
          return {
            embed: {
              title: res.title,
              description: res.description,
              color: 0,
              image_url: imageUrl || "",
              thumbnail_url: "",
              button: [],
            },
            point: res.point,
            probability: res.probability,
          };
        }),
        roles: roleStore.roles.map((store) => {
          return {
            id: store.id,
            point: store.point,
          }
        })
      };

      // APIリクエストを送信
      await upsertGacha(requestData, {
        serverId: gachaRes.server_id,
        accessToken: accessToken,
      })

      toast({
        title: "ガチャの設定が保存されました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch
      (error) {
      console.error("エラーが発生しました", error);
      toast({
        title: "画像のアップロードまたは保存に失敗しました",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ResultのEmbedを追加します
  const addResultEmbedUI = () => {
    if (resultStore.results.length < 30) { // MAXは30
      resultStore.addResult({
        title: "",
        description: "",
        image: null,
        probability: 0,
        point: 0,
      });
    }
  };

  return (
    <Container pt={8} pb={20}>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>ガチャの内容</Tab>
          <Tab>ロール設定</Tab>
        </TabList>
        <TabPanels>
          {/* ガチャの内容 */}
          <TabPanel pt={8}>
            {/* パネル */}
            <Text fontSize='xl' fontWeight="bold">1. ガチャのパネル</Text>
            <Text fontSize='base' mb={3}>
              常に表示させておくメッセージ（パネル）です。「!gacha-panel」というコマンドで表示されます。
            </Text>
            <DiscordEmbedUI
              title={panelStore.title}
              setTitle={(title) => panelStore.setTitle(title)}
              description={panelStore.description}
              setDescription={(description) => panelStore.setDescription(description)}
              file={panelStore.image}
              setFile={(image) => panelStore.setImage(image)}
              buttonLabel={panelStore.button.label}
              setButtonLabel={(btnLabel) => panelStore.setButtonLabel(btnLabel)}
              buttonStyle={panelStore.button.style}
              setButtonStyle={(btnStyle) => panelStore.setButtonStyle(btnStyle)}
              isPanel={true}
            />

            {/* Open */}
            <Text fontSize='xl' mt={5} fontWeight="bold">2. ガチャをOPEN</Text>
            <Text fontSize='base' mb={3}>
              Panelのボタンが押された時に表示されます。ガチャガチャでカプセルが出た状態です。
            </Text>
            <DiscordEmbedUI
              title={openStore.title}
              setTitle={(title) => openStore.setTitle(title)}
              description={openStore.description}
              setDescription={(description) => openStore.setDescription(description)}
              file={openStore.image}
              setFile={(image) => openStore.setImage(image)}
              buttonLabel={openStore.button.label}
              setButtonLabel={(buttonLabel) => openStore.setButtonLabel(buttonLabel)}
              buttonStyle={openStore.button.style}
              setButtonStyle={(buttonColor) => openStore.setButtonStyle(buttonColor)}
            />

            {/* Result */}
            <Text fontSize='xl' mt={5} fontWeight="bold">3. 結果を表示</Text>
            <Text fontSize='base' mb={3}>
              登録された結果の中から、確率に応じてランダムで表示されます。
              それぞれの表示確率を設定できますが、<b>全ての合計が「100(%)」</b>になるようにしてください。
              ポイントは、その結果になった時に得られるポイントです。
            </Text>

            {/* EmbedUIの追加と表示 */}
            <Flex overflowX="scroll" pb={3}>
              {resultStore.results.map((res, index) => (
                <Box key={index} mx={2} minWidth="300px">
                  <DiscordEmbedUI
                    title={res.title}
                    setTitle={(title) => resultStore.setTitle(index, title)}
                    description={res.description}
                    setDescription={(description) => resultStore.setDescription(index, description)}
                    file={res.image}
                    setFile={(image) => resultStore.setImage(index, image)}
                    // 確率とポイントの更新関数
                  />
                  <Flex direction="column" mt={2} pb={1}>
                    <Flex alignItems="center">
                      <Text mr={2}>確率:</Text>
                      <NumberInput
                        placeholder="確率"
                        value={res.probability}
                        onChange={(e) => resultStore.setProbability(index, Number(e))}
                        width="80px" // インプットフィールドのサイズ調整
                        bg={"gray.200"}
                        rounded={"md"}
                      >
                        <NumberInputField/>
                      </NumberInput>
                      <Text ml={1}>%</Text>
                    </Flex>
                    <Flex alignItems="center" mt={2}>
                      <Text mr={2}>ポイント:</Text>
                      <NumberInput
                        placeholder="ポイント"
                        value={res.point}
                        onChange={(e) => resultStore.setPoint(index, Number(e))}
                        width="80px" // インプットフィールドのサイズ調整
                        bg={"gray.200"}
                        rounded={"md"}
                      >
                        <NumberInputField/>
                      </NumberInput>
                      <Text ml={1}>pt</Text>
                    </Flex>
                  </Flex>
                  {resultStore.results.length > 1 && (
                    <IconButton
                      aria-label="Delete Embed UI"
                      icon={<FaTrash/>}
                      onClick={() => {
                        if (resultStore.results.length > 1) { // 最低数は1
                          resultStore.removeResult(index);
                        }
                      }}
                      alignSelf="center"
                      bg="red.400"
                      textColor="white"
                      size="sm"
                    />
                  )}
                </Box>
              ))}
              {resultStore.results.length < 30 && (
                <IconButton
                  aria-label="Add Embed UI"
                  icon={<FaPlus/>}
                  onClick={addResultEmbedUI}
                  alignSelf="center"
                  bg="teal"
                  textColor="white"
                />
              )}
            </Flex>
            <Text fontWeight="bold" mt={3}>確率の合計: {totalProbability}%</Text>
          </TabPanel>
          {/* ロールタブ */}
          <TabPanel>
            <Box backgroundColor={"gray.100"} p={3}>
              <Stack spacing={1}>
                <UnorderedList fontSize='sm' styleType="disc"> {/* スタイルタイプを設定 */}
                  <ListItem>
                    特定のポイント以上になったら、ロールを付与することができます。
                  </ListItem>
                  <ListItem>
                    下位のロールは付与したまま、上位のロールも追加で付与されます。
                  </ListItem>
                  <ListItem>
                    ※ロールが付与できない場合、bot自身のロールが、付与するロールより上位にあることを確認してください。
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Box>

            {roleStore.roles.map((res, index) => (
              <Flex
                key={index}
                mt={5}
                p={3}
                alignItems="center"
                wrap="wrap"
                backgroundColor="gray.50"
                border="1px" // ボーダーの厚さを指定
                borderColor="gray.200" // ボーダーの色を指定
                borderRadius="md" // ボーダーの角を丸める（必要に応じて）
              >
                <NumberInput
                  size='md'
                  maxW={20}
                  defaultValue={1}
                  min={1}
                  mr={3}
                  onChange={(e) => roleStore.setPoint(index, Number(e))}
                  value={res.point}
                >
                  <NumberInputField backgroundColor={"white"}/>
                  <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                  </NumberInputStepper>
                </NumberInput>
                <Text whiteSpace="nowrap"> {/* テキストが折り返されないように設定 */}
                  ptで
                </Text>
                <Select
                  flex="1"
                  minWidth="120px"
                  value={res.id}
                  ml={3}
                  placeholder='ロールを選択'
                  backgroundColor={"white"}
                  onChange={(e) => roleStore.setRoleID(index, e.target.value)}
                >
                  {gachaRes.all_roles && gachaRes.all_roles.map((role, index) => (
                    <option key={index} value={role.id || "error"}>
                      {role.name || "ロールが取得できませんでした"}
                    </option>
                  ))}
                </Select>
                <Box ml={2}>
                  {/* ロールの削除ボタン */}
                  <IconButton
                    aria-label="Delete Embed UI"
                    icon={<FaTrash/>}
                    onClick={() => roleStore.removeRole(index)}
                    alignSelf="center"
                    bg="red.400"
                    textColor="white"
                    size="sm"
                  />
                </Box>
              </Flex>
            ))}

            {/* 追加ボタン */}
            <Box mt={3}>
              <IconButton
                aria-label="Add Embed UI"
                icon={<FaPlus/>}
                onClick={() => {
                  roleStore.addRole({ point: 1, id: "", })
                }}
                alignSelf="center"
                bg="teal"
                textColor="white"
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* 保存ボタン */}
      <Flex justifyContent="flex-end" mt={3}>
        <Button
          colorScheme="teal"
          onClick={handleSave}
          isLoading={isLoading}
          loadingText="保存中"
          spinner={<Spinner size="sm"/>}
          disabled={isLoading}
        >
          保存する
        </Button>
      </Flex>

    </Container>
  )
}
