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
import { useOpenStore, usePanelStore } from "@/utils/store/gachaStore";

type ResultEmbedUIState = {
  title: string;
  description: string;
  image: File | null;
  probability: number;
  points: number;
};

/**
 * クライアントの処理を行います
 */
export default function Client(props: GachaRes) {
  const panelStore = usePanelStore();
  const openStore = useOpenStore();

  useEffect(() => {
    panelStore.init(props.panel);
    openStore.init(props.open);
  }, []);

  const [embedUIs, setEmbedUIs] = useState<ResultEmbedUIState[]>([{
    title: "",
    description: "",
    image: null,
    probability: 0,
    points: 0
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // 保存ボタンをクリックした時の処理です
  const handleSave = async () => {
      setIsLoading(true);

      try {
        // 画像をアップロード
        const imageFilesToUpload = [
          panelStore.image instanceof File ? panelStore.image : null,
          openStore.image instanceof File ? panelStore.image : null,
          ...embedUIs.map(ui => ui.image instanceof File ? ui.image : null),
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
          result: embedUIs.map((ui, index) => {
            const imageUrl = ui.image instanceof File ? uploadedImageUrls[index] : ui.image;
            return {
              embed: {
                title: ui.title,
                description: ui.description,
                color: 0,
                image_url: imageUrl || "", // アップロードされたURLか元のURL
                thumbnail_url: "",
                button: [],
              },
              point: ui.points,
              probability: ui.probability,
            }
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
    }
  ;

  // ResultのEmbedを追加します
  const addResultEmbedUI = () => {
    if (embedUIs.length < 10) { // MAXは10
      const newEmbedUI: ResultEmbedUIState = {
        title: "",
        description: "",
        image: null,
        probability: 0,
        points: 0,
      };
      setEmbedUIs([...embedUIs, newEmbedUI]);
    }
  };

  const removeEmbedUI = (index: number) => {
    if (embedUIs.length > 1) { // 最低数は1
      const updatedEmbedUIs = embedUIs.filter((_, i) => i !== index);
      setEmbedUIs(updatedEmbedUIs);
    }
  };

  // 各フィールドの更新関数
  const updateEmbedUITitle = (index: number, title: string) => {
    const updatedEmbedUIs = [...embedUIs];
    updatedEmbedUIs[index].title = title;
    setEmbedUIs(updatedEmbedUIs);
  };

  const updateEmbedUIDescription = (index: number, description: string) => {
    const updatedEmbedUIs = [...embedUIs];
    updatedEmbedUIs[index].description = description;
    setEmbedUIs(updatedEmbedUIs);
  };

  const updateEmbedUIImage = (index: number, image: File | null) => {
    const updatedEmbedUIs = [...embedUIs];
    updatedEmbedUIs[index].image = image;
    setEmbedUIs(updatedEmbedUIs);
  };

  // 確率とポイントの更新関数
  const updateEmbedUIProbability = (index: number, probability: number) => {
    const updatedEmbedUIs = [...embedUIs];
    updatedEmbedUIs[index].probability = probability;
    setEmbedUIs(updatedEmbedUIs);
  };

  const updateEmbedUIPoints = (index: number, points: number) => {
    const updatedEmbedUIs = [...embedUIs];
    updatedEmbedUIs[index].points = points;
    setEmbedUIs(updatedEmbedUIs);
  };

  // 確率の合計を計算
  const totalProbability = embedUIs.reduce((total, embedUI) => total + embedUI.probability, 0);

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
          {embedUIs.map((embedUI, index) => (
            <Box key={index} mx={2} minWidth="300px">
              <DiscordEmbedUI
                title={embedUI.title}
                setTitle={(title) => updateEmbedUITitle(index, title)}
                description={embedUI.description}
                setDescription={(description) => updateEmbedUIDescription(index, description)}
                file={embedUI.image}
                setFile={(image) => updateEmbedUIImage(index, image)}
              />
              <Flex direction="column" mt={2} pb={1}>
                <Flex alignItems="center">
                  <Text mr={2}>確率:</Text>
                  <NumberInput
                    placeholder="確率"
                    value={embedUI.probability}
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
                    value={embedUI.points}
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
              {embedUIs.length > 1 && (
                <IconButton
                  aria-label="Delete Embed UI"
                  icon={<FaTrash/>}
                  onClick={() => removeEmbedUI(index)}
                  alignSelf="center"
                  bg="red.400"
                  textColor="white"
                  size="sm"
                />
              )}
            </Box>
          ))}
          {embedUIs.length < 10 && (
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
