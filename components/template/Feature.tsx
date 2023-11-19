'use client'

import {
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoGameController, IoGiftOutline } from 'react-icons/io5'
import { ReactElement } from 'react'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Discord bot
          </Text>
          <Heading>毎日ガチャを回そう！</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Discordでガチャが回せるbotが作れます。文字や画像は各コミュニティでカスタマイズOK！
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')}/>
            }>
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5}/>}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Discordでのアクティブ率UP'}
            />
            <Feature
              icon={<Icon as={IoGameController} color={'green.500'} w={5} h={5}/>}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'毎日楽しめる'}
            />
            <Feature
              icon={<Icon as={IoGiftOutline} color={'purple.500'} w={5} h={5}/>}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'当たり回数に応じてロールを付与できる'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={'/gacha-panel.png'}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}