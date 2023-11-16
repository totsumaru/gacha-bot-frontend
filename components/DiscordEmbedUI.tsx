import React, { useState } from 'react';
import { Box, Center, HStack, IconButton, Image, Input, Textarea, VStack } from '@chakra-ui/react';
import ButtonDrawer from "@/components/embed/button";
import { FaTrashAlt } from "react-icons/fa";

function DiscordEmbedUI() {
  const [imageSrc, setImageSrc] = useState('');
  const [buttonLabel, setButtonLabel] = useState('ガチャを引く');
  const [buttonColor, setButtonColor] = useState('blue');
  const bg = 'gray.800'; // Discordのダークモードに近い背景色
  const borderColor = 'gray.600';
  const textColor = 'gray.100'; // 明るいテキストカラー
  const placeholderColor = 'gray.500'; // プレースホルダーのカラー

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImageSrc(''); // 画像URLをリセット
  };

  return (
    <Box bg={bg} p={4} borderRadius="md" maxW="xl" mx="auto" color={textColor}>
      <VStack spacing={4} align="stretch">

        {/* Title Input */}
        <Input
          placeholder="タイトル"
          variant="filled"
          _placeholder={{ color: placeholderColor }}
          bg={bg}
          _hover={{ bg: 'gray.700' }} // hover時の背景色を追加
        />

        {/* Message Textarea */}
        <Textarea
          placeholder="メッセージをここに記入"
          variant="filled"
          size="md"
          _placeholder={{ color: placeholderColor }}
          bg={bg}
          _hover={{ bg: 'gray.700' }} // hover時の背景色を追加
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
            {imageSrc ? (
              <Image src={imageSrc} alt="Uploaded image" borderRadius="md"/>
            ) : (
              <Center p={12}>
                クリックして画像を選択
              </Center>
            )}
          </Box>

          {/* Delete Image Icon */}
          {imageSrc && (
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

        {/* 'ガチャを引く' Button */}
        <HStack justifyContent="flex-start">
          <ButtonDrawer
            label={buttonLabel}
            setLabel={(label) => setButtonLabel(label)}
            color={buttonColor}
            setColor={(color) => setButtonColor(color)}
          />
        </HStack>

      </VStack>
    </Box>
  );
}

export default DiscordEmbedUI;
