import React, { useRef } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Link,
  Stack,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaBan } from "react-icons/fa";

// isHiddenはわかりにくいので、このコンポーネントではisEnabledとしている
type Props = {
  label: string,
  setLabel: (label: string) => void,
  url: string,
  setURL: (url: string) => void,
  isEnabled: boolean,
  setIsEnabled: (isHidden: boolean) => void,
}

/**
 * リンクボタンの設定を行うDrawer
 */
export default function LinkButtonDrawer({
  label, setLabel, url, setURL, isEnabled, setIsEnabled,
}: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Switchの状態を変更する
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(event.target.checked);
  };

  // ラベルが変更された時の処理
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) {
      toast({
        title: "ラベルは8文字以内にしてください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLabel(e.target.value);
  };

  // URLが変更された時の処理
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  return (
    <>
      <Button ref={btnRef} colorScheme={"gray"} onClick={onOpen}>
        {isEnabled ? label : <FaBan/>}
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>リンクボタンの設定</DrawerHeader>
          <DrawerBody>
            <Text fontSize={"sm"} mb={5}>
              リンクボタンを設置できます。（ボタンを表示しないこともできます）
            </Text>

            <Stack spacing={4}>
              <Switch size='lg' isChecked={isEnabled} onChange={handleSwitchChange}/>
              <Input
                placeholder='ラベルを入力'
                value={label}
                onChange={handleLabelChange}
                disabled={!isEnabled}
              />
              <Input
                placeholder='URLを入力'
                value={url}
                onChange={handleURLChange}
                disabled={!isEnabled}
              />
            </Stack>

            <Box p={3} backgroundColor={"gray.100"} mt={5}>
              <Text fontSize={"sm"} textColor={"gray.700"}>
                Xでポストしてもらいたい場合は、以下のサイトをご利用下さい。<br/>
                ※外部サイトのため、注意してご使用ください。
              </Text>
              <Link target={"_blank"} href={"https://tools.ikunaga.net/tweet-link/"}>
                <Text textColor={"blue.500"} fontSize={"sm"} fontWeight={"bold"} mt={3}>
                  X(Twitter)のリンクを作成
                </Text>
              </Link>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              閉じる
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
