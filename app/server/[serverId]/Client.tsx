"use client"

import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react'
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GachaReq, GachaRes } from "@/utils/api/body";
import { uploadImages } from "@/utils/api/upload_images";
import { upsertGacha } from "@/utils/api/upsert_gacha";
import { resultStore, useOpenStore, usePanelStore, useResultStore } from "@/utils/store/gachaStore";

/**
 * クライアントの処理を行います
 */
export default function Client(props: GachaRes) {
  const panelStore = usePanelStore();
  const openStore = useOpenStore();
  const resultStore = useResultStore();

  useEffect(() => {
    panelStore.init(props.panel);
    openStore.init(props.open);
    resultStore.init(props.result);
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
      // 画像をアップロード
      const imageFilesToUpload = [
        panelStore.image instanceof File ? panelStore.image : null,
        openStore.image instanceof File ? openStore.image : null,
        ...resultStore.results.map(res => res.image instanceof File ? res.image : null),
      ].filter(file => file !== null) as File[]; // File型のみの配列を保証

      let uploadedImageUrls: string[] = [];
      if (imageFilesToUpload.length !== 0) {
        uploadedImageUrls = await uploadImages(imageFilesToUpload);
      }

      // アップロードされた画像のURLか、元のURLを使用
      const panelImageUrl = panelStore.image instanceof File ? uploadedImageUrls.shift() : panelStore.image;
      const openImageUrl = openStore.image instanceof File ? uploadedImageUrls.shift() : openStore.image;

      // APIリクエストに必要なデータを準備
      const requestData: GachaReq = {
        id: props.id,
        server_id: props.server_id,
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
        result: resultStore.results.map((res, index) => {
          const imageUrl = res.image instanceof File ? uploadedImageUrls[index] : res.image;
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
        })
      };

      // APIリクエストを送信
      await upsertGacha(requestData)

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
    if (resultStore.results.length < 10) { // MAXは10
      resultStore.addResult({
        title: "",
        description: "",
        image: null,
        probability: 0,
        point: 0,
      });
    }
  };


  // 特定のResult Embedを削除します
  const removeResultEmbedUI = (index: number) => {
    if (resultStore.results.length > 1) { // 最低数は1
      resultStore.removeResult(index);
    }
  };

  const updateEmbedUIProbability = (index: number, probability: number) => {
    resultStore.setProbability(index, probability);
  };

  const updateEmbedUIPoints = (index: number, points: number) => {
    resultStore.setPoint(index, points);
  };

  return (
    <>
      <Header/>
      <Container mt={10} pb={20}>
        {/* パネル */}
        <Text fontSize='xl' fontWeight="bold">1. Panel</Text>
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
        />

        {/* Open */}
        <Text fontSize='xl' mt={5} fontWeight="bold">2. Open</Text>
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
        <Text fontSize='xl' mt={5} fontWeight="bold">3. Result</Text>
        <Text fontSize='base' mb={3}>
          当たり/ハズレなどの結果発表です。登録されたものの中からランダムで表示されます。
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
                    onChange={(e) => updateEmbedUIProbability(index, Number(e))}
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
                    onChange={(e) => updateEmbedUIPoints(index, Number(e))}
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
                  onClick={() => removeResultEmbedUI(index)}
                  alignSelf="center"
                  bg="red.400"
                  textColor="white"
                  size="sm"
                />
              )}
            </Box>
          ))}
          {resultStore.results.length < 10 && (
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
    </>
  )
}
