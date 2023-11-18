'use client'

import { Container, Divider, Heading, HStack, Image, Link, SpaceProps, Tag, Text, VStack, } from '@chakra-ui/react'

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

interface Props {
  marginTop?: number
  tags: any[]
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

const ArticleList = () => {
  return (
    <Container maxW={'7xl'} p="12">
      <Divider marginTop="5"/>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">Botの使い方</Heading>
        <Text as="p" fontSize="lg">
          以下のURLをご確認下さい。<br/>
          <Link
            href={"https://daffy-hamburger-7f6.notion.site/Gacha-bot-147a7590488f45b797ce7c5bad6085ca?pvs=4"}
            color={"blue.500"}
            fontWeight={"bold"}
            mt={2}
          >
            Botの使い方はこちら
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default ArticleList