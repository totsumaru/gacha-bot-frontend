import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Client from "@/app/server/[serverId]/Client";
import { getGacha } from "@/utils/api/get_gacha";
import Header from "@/components/Header";
import { Button, Center, Stack } from "@chakra-ui/react";
import { getServer } from "@/utils/api/get_server";
import React from "react";

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

  try {
    const gacha = await getGacha({
      serverId: serverId,
      accessToken: session.access_token,
    })

    const server = await getServer({
      serverId: serverId,
      accessToken: session.access_token,
    })

    return (
      <>
        <Header isLogin={true} displayLoginButton={true} serverId={serverId}/>
        {server.subscriber_id ? (
          <Client
            accessToken={session.access_token}
            gachaRes={{
              id: gacha.id,
              server_id: gacha.server_id,
              panel: gacha.panel,
              open: gacha.open,
              result: gacha.result,
              role: gacha.role,
              all_role: gacha.all_role,
            }}
          />
        ) : (
          <Stack spacing={4} align="center" mt={20}>
            <p>このサーバーはまだ登録されていません。</p>
            <Button
              as={"a"}
              href={`/server/${serverId}/dashboard`}
              colorScheme="teal"
              ml={2}
            >
              ダッシュボードへ移動
            </Button>
          </Stack>
        )}
      </>
    )
  } catch (error) {
    console.error(error)

    return (
      <>
        <Header isLogin={true} displayLoginButton={true} serverId={serverId}/>
        <Center mt={20}>
          エラーが発生しました。管理者以外はアクセスできません。
        </Center>
      </>
    )
  }
}