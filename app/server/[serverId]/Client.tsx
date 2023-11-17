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
import React, { useState } from "react";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import { FaPlus, FaTrash } from "react-icons/fa";
import { uploadImages } from "@/utils/api/body";

type EmbedUIState = {
  key: number;
  title: string;
  description: string;
  image: File | null;
  buttonLabel: string;
  buttonColor: string;
  probability: number;
  points: number;
};

type Props = {
  id: string
  serverId: string
}

export default function Client(props: Props) {
  const [id, setId] = useState(props.id);
  // パネル
  const [panelTitle, setPanelTitle] = useState<string>("")
  const [panelDescription, setPanelDescription] = useState<string>("")
  const [panelImage, setPanelImage] = useState<File | null>(null)
  const [panelButtonLabel, setPanelButtonLabel] = useState<string>("ガチャを引く")
  const [panelButtonColor, setPanelButtonColor] = useState<string>("blue")
  // Open
  const [openTitle, setOpenTitle] = useState<string>("")
  const [openDescription, setOpenDescription] = useState<string>("")
  const [openImage, setOpenImage] = useState<File | null>(null)
  const [openButtonLabel, setOpenButtonLabel] = useState<string>("OPEN")
  const [openButtonColor, setOpenButtonColor] = useState<string>("blue")
  const [embedUIs, setEmbedUIs] = useState<EmbedUIState[]>([{
    key: 0,
    title: "",
    description: "",
    image: null,
    buttonLabel: "",
    buttonColor: "blue",
    probability: 0,
    points: 0
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // 保存ボタンをクリックした時の処理です
  const handleSave = async () => {
    setIsLoading(true);

    try {
      // すべての画像ファイルを配列にまとめる
      const allImageFiles = [
        panelImage, // Fileオブジェクト
        openImage,  // Fileオブジェクト
        ...embedUIs.map(ui => ui.image) // 各EmbedUIのFileオブジェクト
      ].filter(file => file != null); // nullでないファイルのみをフィルタリング

      // Fileオブジェクトの配列をアップロードする
      const uploadedImageUrls = await uploadImages(allImageFiles as File[]);

      console.log("Uploaded Image URLs:", uploadedImageUrls);

      // その他のリクエスト処理...
      // 省略
    } catch (error) {
      console.error("画像のアップロードまたは保存に失敗しました:", error);
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

  const addEmbedUI = () => {
    if (embedUIs.length < 10) { // MAXは10
      const newKey = embedUIs.length;
      const newEmbedUI: EmbedUIState = {
        key: newKey,
        title: "",
        description: "",
        image: null,
        buttonLabel: "ガチャを引く",
        buttonColor: "blue",
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
          title={panelTitle}
          setTitle={(title) => setPanelTitle(title)}
          description={panelDescription}
          setDescription={(description) => setPanelDescription(description)}
          file={panelImage}
          setFile={(image) => setPanelImage(image)}
          buttonLabel={panelButtonLabel}
          setButtonLabel={(buttonLabel) => setPanelButtonLabel(buttonLabel)}
          buttonColor={panelButtonColor}
          setButtonColor={(buttonColor) => setPanelButtonColor(buttonColor)}
        />

        {/* Open */}
        <Text fontSize='xl' mt={5} fontWeight="bold">2. Open</Text>
        <Text fontSize='base' mb={3}>
          Panelのボタンが押された時に表示されます。ガチャガチャでカプセルが出た状態です。
        </Text>
        <DiscordEmbedUI
          title={openTitle}
          setTitle={(title) => setOpenTitle(title)}
          description={openDescription}
          setDescription={(description) => setOpenDescription(description)}
          file={openImage}
          setFile={(image) => setOpenImage(image)}
          buttonLabel={openButtonLabel}
          setButtonLabel={(buttonLabel) => setOpenButtonLabel(buttonLabel)}
          buttonColor={openButtonColor}
          setButtonColor={(buttonColor) => setOpenButtonColor(buttonColor)}
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
              onClick={addEmbedUI}
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
