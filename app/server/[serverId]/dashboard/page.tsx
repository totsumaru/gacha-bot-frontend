import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import React from "react";
import { Center, Container, Heading, Text } from "@chakra-ui/react";
import CheckoutButton from "@/components/button/CheckoutButton";
import { getServer } from "@/utils/api/get_server";
import CustomerPortalButton from "@/components/button/CustomerPortalButton";

export default async function Index({
  params: { serverId }
}: {
  params: { serverId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // ログインしていない場合は、ログインメッセージを表示
  if (!session) {
    return (
      <>
        <Header isLogin={false} displayLoginButton={true} serverId={serverId}/>
        <Center mt={20}>
          ログインしてください。
        </Center>
      </>
    )
  }

  // サーバーを取得します
  const serverRes = await getServer({
    serverId: serverId,
    accessToken: session.access_token,
  })

  let buttonOrText
  if (serverRes.subscriber_id) {
    // サブスクライバー(支払い者)には、カスタマーポータルを表示します
    if (serverRes.is_subscriber) {
      buttonOrText = (
        <>
          <CustomerPortalButton
            serverId={serverId}
            accessToken={session?.access_token || ""}
          />
          <Text mt={5}>
            ✅ 機能が使用できます。<br/>
            ※お支払い情報は本人しか閲覧できません。
          </Text>
        </>
      )
    } else {
      buttonOrText = (
        <Text mt={5}>
          ✅ 機能が使用できます。<br/>
          ※お支払い情報は本人しか閲覧できません。
        </Text>
      )
    }
  } else {
    // サブスクライバー(支払い者)でない場合は、チェックアウトを表示します
    buttonOrText = (
      <CheckoutButton
        serverId={serverId}
        accessToken={session?.access_token || ""}
      />
    )
  }

  return (
    <>
      <Header isLogin={true} displayLoginButton={true} serverId={serverId}/>
      <Container mt={10}>
        <Heading>Dashboard</Heading>
        <Text mt={5}>お支払い情報を表示します。</Text>
        {buttonOrText}
      </Container>
    </>
  )
}