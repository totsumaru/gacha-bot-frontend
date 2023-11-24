import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import { Center } from "@chakra-ui/react";
import React from "react";
import { getAdminServers } from "@/utils/api/get_admin_servers";
import Client from "@/app/admin/servers/Client";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // ログインしていない場合は、ログインメッセージを表示
  if (!session) {
    return (
      <>
        <Header isLogin={false} displayLoginButton={true}/>
        <Center mt={20}>
          ログインしてください。
        </Center>
      </>
    )
  }

  try {
    const servers = await getAdminServers(session.access_token)

    return (
      <>
        <Header isLogin={false} displayLoginButton={true}/>
        <Client servers={servers}/>
      </>
    )
  } catch (error) {
    console.error(error)

    return (
      <>
        <Header isLogin={false} displayLoginButton={true}/>
        <Center mt={20}>
          エラーが発生しました。管理者以外はアクセスできません。
        </Center>
      </>
    )
  }
}