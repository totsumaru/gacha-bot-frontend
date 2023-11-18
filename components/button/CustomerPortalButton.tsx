"use client"

// 支払いのチェックアウトを作成します
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { customerPortal } from "@/utils/api/customer_portal";

type Props = {
  serverId: string
  accessToken: string
}

// カスタマーポータルを作成するボタンです
export default function CustomerPortalButton({ serverId, accessToken }: Props) {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    (async () => {
      setLoading(true)

      const redirectUrl = await customerPortal({
        serverId: serverId,
        accessToken: accessToken,
      })
      setUrl(redirectUrl)
    })().finally(() => setLoading(false))
  }, [])

  return (
    <Button
      mt={5}
      as={url ? 'a' : undefined}
      href={url || undefined}
      colorScheme="teal"
      target={url ? "_blank" : undefined}
      isLoading={loading}
      isDisabled={loading || !url}
    >
      お支払い情報の確認
    </Button>
  )
}