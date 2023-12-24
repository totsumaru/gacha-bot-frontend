"use client"

import React, { useEffect } from 'react';
import { Badge, Container, Flex, Heading, Image, Spacer, Text, VStack, } from '@chakra-ui/react';
import { getRanking, RankingItem } from "@/utils/api/get_ranking";

// ランキングの項目を表す型
type Props = {
  serverId: string
};

/**
 * ランキングページ
 */
export default function Client(props: Props) {
  const [userDatas, setUserDatas] = React.useState<RankingItem[]>([])
  useEffect(() => {
    (async () => {
      try {
        const users = await getRanking({
          serverId: props.serverId,
        })
        setUserDatas(users)
      } catch (e) {
        console.error(e)
        return (
          <>エラーが発生しました</>
        )
      }
    })()
  }, [])

  return (
    <Container maxW="xl" centerContent py={10}>
      <Heading mb={2} color="white">
        👑 ランキング 👑
      </Heading>
      <Text textColor={"white"} mb={6}>
        上位100位が表示されます。
      </Text>
      <VStack spacing={4} align="stretch" w="full">
        {userDatas.map((user) => (
          <Flex
            key={user.user_name}
            p={3}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            _hover={{ bg: "gray.50" }}
            alignItems="center"
            w="full"
          >
            <Badge
              px={2}
              py={1}
              colorScheme="blue"
              borderRadius="full"
              mr={4}
            >
              {user.rank}位
            </Badge>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={user.avatar_url}
              alt={`Avatar of ${user.user_name}`}
              mr={4}
            />
            <Text fontWeight="bold">{user.user_name}</Text>
            <Spacer/>
            <Text color="gray.600" ml={4}>{user.point}pt</Text>
          </Flex>
        ))}
      </VStack>
    </Container>
  );
}
