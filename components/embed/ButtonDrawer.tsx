import React, { useRef } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { ButtonStyle } from "@/utils/api/body";

const btnStyleToColor = (style: ButtonStyle) => {
  switch (style) {
    case "PRIMARY":
      return "blue";
    case "SUCCESS":
      return "green";
  }
}

type Props = {
  label: string,
  setLabel: (label: string) => void,
  style: ButtonStyle,
  setStyle: (style: ButtonStyle) => void
}

/**
 * ボタンの設定を行うDrawer
 */
export default function ButtonDrawer({
  label, setLabel, style, setStyle
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) {
      toast({
        title: "ラベルは8文字以内にしてください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return
    }
    setLabel(e.target.value);
  };

  const isSelectedStyle = (s: ButtonStyle) => {
    return style === s ? 'outline' : 'ghost';
  };

  return (
    <>
      <Button ref={btnRef} colorScheme={btnStyleToColor(style)} onClick={onOpen}>
        {label}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>ボタンの設定</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder='ラベルを入力'
              value={label}
              onChange={handleLabelChange}
            />
            <HStack spacing={4} mt={4}>
              <IconButton
                aria-label="Primary color"
                icon={<FaCircle/>}
                colorScheme="blue"
                variant={isSelectedStyle('PRIMARY')}
                onClick={() => setStyle('PRIMARY')}
              />
              <IconButton
                aria-label="Success color"
                icon={<FaCircle/>}
                colorScheme="green"
                variant={isSelectedStyle('SUCCESS')}
                onClick={() => setStyle('SUCCESS')}
              />
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              閉じる
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
