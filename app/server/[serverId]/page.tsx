import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Client from "@/app/server/[serverId]/Client";
import { getGacha } from "@/utils/api/get_gacha";
import Header from "@/components/Header";
import { Center } from "@chakra-ui/react";

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

  const gacha = await getGacha({
    serverId: serverId,
    accessToken: session.access_token,
  })

  return (
    <>
      <Header isLogin={true} displayLoginButton={true} serverId={serverId}/>
      <Client
        accessToken={session.access_token}
        gachaRes={{
          id: gacha.id,
          server_id: gacha.server_id,
          panel: gacha.panel,
          open: gacha.open,
          result: gacha.result,
        }}
      />
    </>
  )
}