"use client"

import React from 'react';
import { Badge, Container, Flex, Heading, Image, Spacer, Text, VStack, } from '@chakra-ui/react';

// ランキングの項目を表す型
type Props = {
  users: {
    user_name: string;
    avatar_url: string;
    point: number;
    rank: number;
  }[]
};

/**
 * ランキングページ
 */
export default function Client(props: Props) {
  return (
    <Container maxW="xl" centerContent py={10}>
      <Heading mb={2} color="white">
        👑 Ranking 👑
      </Heading>
      <Text textColor={"white"} mb={6}>
        上位100位が表示されます。
      </Text>
      <VStack spacing={4} align="stretch" w="full">
        {props.users.map((user) => (
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
