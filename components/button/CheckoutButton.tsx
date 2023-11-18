"use client"

// 支払いのチェックアウトを作成します
import { checkout } from "@/utils/api/checkout";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  serverId: string
  accessToken: string
}

// チェックアウトを作成するボタンです
export default function CheckoutButton({ serverId, accessToken }: Props) {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    (async () => {
      setLoading(true)
      const redirectUrl = await checkout({
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
      お支払い
    </Button>
  )
}