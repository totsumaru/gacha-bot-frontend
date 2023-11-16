"use client"

import { Button } from "@chakra-ui/react";

export default function LoginButton() {
  return (
    <>
      <Button
        as={'a'}
        href={'#'}
        colorScheme="teal"
      >
        ログイン
      </Button>
    </>
  )
}