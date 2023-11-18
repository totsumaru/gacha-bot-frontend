import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Client from "@/app/server/[serverId]/Client";
import { getGacha } from "@/utils/api/get_gacha";

export default async function Index({
  params: { serverId }
}: {
  params: { serverId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  const gacha = await getGacha(serverId)

  return (
    <>
      <Client
        id={gacha.id}
        server_id={gacha.server_id}
        panel={gacha.panel}
        open={gacha.open}
        result={gacha.result}
      />
    </>
  )
}