import React, { useEffect, useRef, useState } from 'react';
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
  useDisclosure
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
export default function ButtonDrawer({ label, setLabel, style, setStyle }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);
  const [newLabel, setNewLabel] = useState(label);
  const [newStyle, setNewStyle] = useState(style);

  useEffect(() => {
    setNewLabel(label);
    setNewStyle(style)
  }, [label, style])

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabel(e.target.value);
  };

  const handleSave = () => {
    // ボタンのラベルが8文字を超えていたらエラーを出す
    if (newLabel.length > 8) {
      alert('ボタンのラベルは8文字以内にしてください');
      return;
    }
    setLabel(newLabel);
    setStyle(newStyle);
    onClose();
  };

  const isSelectedStyle = (style: ButtonStyle) => {
    return newStyle === style ? 'outline' : 'ghost';
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
              value={newLabel}
              onChange={handleLabelChange}
            />
            <HStack spacing={4} mt={4}>
              <IconButton
                aria-label="Primary color"
                icon={<FaCircle/>}
                colorScheme="blue"
                variant={isSelectedStyle('PRIMARY')}
                onClick={() => setNewStyle('PRIMARY')}
              />
              <IconButton
                aria-label="Success color"
                icon={<FaCircle/>}
                colorScheme="green"
                variant={isSelectedStyle('SUCCESS')}
                onClick={() => setNewStyle('SUCCESS')}
              />
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme='teal' onClick={handleSave}>
              保存
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
