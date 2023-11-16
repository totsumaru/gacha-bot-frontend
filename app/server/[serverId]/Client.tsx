"use client"

import { Container, Text } from '@chakra-ui/react'
import Header from "@/components/Header";
import React, { useState } from "react";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";

export default function Client() {
  const [panelTitle, setPanelTitle] = useState<string>("")
  const [panelDescription, setPanelDescription] = useState<string>("")
  const [panelImage, setPanelImage] = useState<string>("")
  const [panelButtonLabel, setPanelButtonLabel] = useState<string>("ガチャを引く")
  const [panelButtonColor, setPanelButtonColor] = useState<string>("blue")

  return (
    <>
      <Header/>
      <Container mt={10}>
        <Text fontSize='xl'>パネル</Text>
        {/* パネル */}
        <DiscordEmbedUI
          title={panelTitle}
          setTitle={(title) => setPanelTitle(title)}
          description={panelDescription}
          setDescription={(description) => setPanelDescription(description)}
          image={panelImage}
          setImage={(image) => setPanelImage(image)}
          buttonLabel={panelButtonLabel}
          setButtonLabel={(buttonLabel) => setPanelButtonLabel(buttonLabel)}
          buttonColor={panelButtonColor}
          setButtonColor={(buttonColor) => setPanelButtonColor(buttonColor)}
        />
      </Container>
    </>
  )
}
