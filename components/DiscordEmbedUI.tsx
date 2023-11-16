import React, { useState } from 'react';
import { Box, Center, HStack, Image, Input, Textarea, useColorModeValue, VStack } from '@chakra-ui/react';
import ButtonDrawer from "@/components/embed/button";

function DiscordEmbedUI() {
  const [imageSrc, setImageSrc] = useState('');
  const [buttonLabel, setButtonLabel] = useState('ガチャを引く'); // ボタンのラベルのステートを追加
  const [buttonColor, setButtonColor] = useState('blue'); // ボタンの色のステート
  const bg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <Box bg={bg} p={4} borderRadius="md" maxW="xl" mx="auto">
      <VStack spacing={4} align="stretch">

        {/* Title Input */}
        <Input placeholder="タイトル" variant="filled"/>

        {/* Message Textarea */}
        <Textarea
          placeholder="メッセージをここに記入"
          variant="filled"
          size="md"
        />

        {/* Image Upload and Display */}
        <Box
          border="2px dashed"
          borderColor={borderColor}
          borderRadius="md"
          _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
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
