import Client from "@/app/server/[serverId]/ranking/Client";
import React from "react";
import { Box } from "@chakra-ui/react";

export default async function Index({
  params: { serverId }
}: {
  params: { serverId: string }
}) {
  try {
    return (
      <Box
        style={{
          background: 'linear-gradient(135deg, rgba(102,126,234,1) 0%, rgba(118,75,162,1) 100%)',
        }}
        minH="100vh"
      >
        <Client serverId={serverId}/>
      </Box>
    )
  } catch (e) {
    console.error(e)
    return (
      <>エラーが発生しました</>
    )
  }
}