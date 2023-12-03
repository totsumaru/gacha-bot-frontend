"use client"

import React from 'react';
import { Badge, Box, Container, Flex, Image, Spacer, Text, VStack, } from '@chakra-ui/react';

type Props = {
  servers: {
    id: string;
    name: string;
    icon_url: string;
    subscriber: {
      user_name: string;
      avatar_url: string;
    };
  }[]
};

/**
 * 管理者ページ
 */
export default function Client(props: Props) {
  return (
    <Container maxW="xl" centerContent py={10}>
      <VStack spacing={4} align="stretch" w="full">
        {props.servers.map((server, index) => (
          <Flex
            key={server.id}
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
              {index + 1}
            </Badge>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={server.icon_url}
              alt={`Avatar of ${server.name}`}
              mr={4}
            />
            <Box>
              <Text fontWeight="bold">{server.name}</Text>
              <Text fontSize="sm" color="gray.500">{server.id}</Text>
            </Box>
            <Spacer/>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={server.subscriber.avatar_url}
              alt={`Avatar of ${server.subscriber.user_name}`}
              mr={1}
            />
            <Text color="gray.600" ml={1}>{server.subscriber.user_name}</Text>
          </Flex>
        ))}
      </VStack>
    </Container>
  );
}
