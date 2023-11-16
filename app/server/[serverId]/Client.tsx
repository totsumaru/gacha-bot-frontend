"use client"

import { Container, Text } from '@chakra-ui/react'
import Header from "@/components/Header";
import React from "react";
import DiscordEmbedUI from "@/components/DiscordEmbedUI";

export default function Client() {
  return (
    <>
      <Header/>
      <Container mt={10}>
        <Text fontSize='xl'>パネル</Text>
        {/* パネル */}
        <DiscordEmbedUI/>
      </Container>
    </>
  )
}
