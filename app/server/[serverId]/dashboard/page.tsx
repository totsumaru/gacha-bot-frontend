import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import CheckoutButton from "@/components/button/CheckoutButton";

export default async function Index({
  params: { serverId }
}: {
  params: { serverId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // ログインしていない場合は、ログインメッセージを表示
  // if (!session) {
  //   return (
  //     <>
  //       <Header isLogin={false} displayLoginButton={true} serverId={serverId}/>
  //       <Center mt={20}>
  //         ログインしてください。
  //       </Center>
  //     </>
  //   )
  // }

  return (
    <>
      <Header isLogin={true} displayLoginButton={true} serverId={serverId}/>
      <Container mt={10}>
        <Heading>Dashboard</Heading>
        <Text mt={5}>お支払い情報を表示します。</Text>
        <CheckoutButton serverId={serverId} accessToken={session?.access_token || ""}/>
      </Container>
    </>
  )
}