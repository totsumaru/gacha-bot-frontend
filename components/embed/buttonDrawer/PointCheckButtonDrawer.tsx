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
  Text,
  useDisclosure
} from '@chakra-ui/react';

/**
 * ボタンの設定を行うDrawer
 */
export default function PointCheckButtonDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} colorScheme={"gray"} onClick={onOpen}>
        ポイント確認
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
            <Text>
              このボタンは編集できません。<br/>
              実際は、このボタンを押すと自分のポイントが表示されます。
            </Text>
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
