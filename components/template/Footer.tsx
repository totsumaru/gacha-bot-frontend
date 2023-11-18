'use client'

import { Box, Container, Stack, Text, useColorModeValue, } from '@chakra-ui/react'

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Stack direction={'row'} spacing={6}>
          <Box as="a" target={"_blank"}
               href={'https://daffy-hamburger-7f6.notion.site/Gacha-bot-6a6523681689447fb169261db6c327c0?pvs=4'}>
            利用規約
          </Box>
          <Box as="a" target={"_blank"}
               href={'https://daffy-hamburger-7f6.notion.site/Gacha-bot-0934bf93cb1844b8a86eced8c75e039d?pvs=4'}>
            プライバシーポリシー
          </Box>
          <Box as="a" target={"_blank"}
               href={'https://daffy-hamburger-7f6.notion.site/Gacha-bot-4255d0cf29d1478f9c0ed5e0a57a4bfd?pvs=4'}>
            特定商取引法に基づく表記
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2023 ArGate, Inc. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  )
}