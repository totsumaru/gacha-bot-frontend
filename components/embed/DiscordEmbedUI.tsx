import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Center, HStack, IconButton, Image, Input, Textarea, VStack } from '@chakra-ui/react';
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  // タイトル
  title: string;
  setTitle: (title: string) => void;
  // 説明
  description: string;
  setDescription: (description: string) => void;
  // 画像
  file: string | File | null;
  setFile: (file: File | null) => void;
  // ボタン
  buttons: ReactNode[];
}

/**
 * DiscordのEmbedUIを再現したコンポーネントです
 */
function DiscordEmbedUI(props: Props) {
  const bg = 'gray.800'; // Discordのダークモードに近い背景色
  const borderColor = 'gray.600';
  const textColor = 'gray.100'; // 明るいテキストカラー
  const placeholderColor = 'gray.500'; // プレースホルダーのカラー
  const [rows, setRows] = useState(3); // 初期行数は3行

  useEffect(() => {
    const lineCount = props.description.split('\n').length;
    setRows(Math.max(3, lineCount)); // 入力行数に応じて行数を更新
  }, [props.description]);

  // 画像を変更します
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      props.setFile(file); // Fileオブジェクトを設定
    }
  };

  // 画像を削除します
  const handleImageDelete = () => {
    props.setFile(null); // Fileオブジェクトをnullに設定
  };

  return (
    <Box bg={bg} p={4} borderRadius="md" maxW="xl" mx="auto" color={textColor}>
      <VStack spacing={4} align="stretch">

        {/* タイトル */}
        <Input
          value={props.title}
          placeholder="タイトル"
          variant="filled"
          onChange={(e) => props.setTitle(e.target.value)}
          bg={bg}
          _placeholder={{ color: placeholderColor }}
          _hover={{ bg: 'gray.700' }} // hover時の背景色を追加
        />

        {/* Message Textarea */}
        <Textarea
          value={props.description}
          placeholder="メッセージをここに記入"
          variant="filled"
          size="md"
          onChange={(e) => props.setDescription(e.target.value)}
          bg={bg}
          _placeholder={{ color: placeholderColor }}
          _hover={{ bg: 'gray.700' }} // hover時の背景色を追加
          rows={rows}
        />

        {/* Image Upload and Display */}
        <Box position="relative">
          <Box
            border="2px dashed"
            borderColor={borderColor}
            borderRadius="md"
            _hover={{ bg: 'gray.700' }}
            position="relative"
            cursor="pointer"
          >
            <Input
              type="file"
              accept="image/*"
              opacity="0"
              position="absolute"
              width="full"
              height="full"
              top="0"
              left="0"
              cursor="pointer"
              onChange={handleImageChange}
            />
            {props.file ? (
              <Image
                src={typeof props.file === 'string' ? props.file : URL.createObjectURL(props.file)}
                alt="Uploaded image"
                borderRadius="md"
                width="100%"
              />
            ) : (
              <Center p={12}>
                クリックして画像を選択
              </Center>
            )}
          </Box>

          {/* Delete Image Icon */}
          {props.file && (
            <IconButton
              icon={<FaTrashAlt/>}
              aria-label="Delete image"
              position="absolute"
              top="1"
              right="1"
              colorScheme="red"
              onClick={handleImageDelete}
            />
          )}
        </Box>

        <HStack justifyContent="flex-start" spacing={4}>
          {props.buttons.map((buttonComponent, index) =>
            <React.Fragment key={index}>
              {buttonComponent}
            </React.Fragment>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}

export default DiscordEmbedUI;
