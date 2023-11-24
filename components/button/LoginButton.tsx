"use client"

import { Button, Spinner } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

type Props = {
  serverId?: string
}

export default function LoginButton({ serverId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const signIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          scopes: "guilds",
          redirectTo: serverId
            ? `${process.env.NEXT_PUBLIC_FE_URL}/auth/callback?server_id=${serverId}`
            : `${process.env.NEXT_PUBLIC_FE_URL}/admin/servers`
        }
      });
      if (error) {
        alert(`エラーが発生しました: ${error.message}`);
      }
    } catch (e) {
      alert(`エラーが発生しました`);
    }
  };

  return (
    <Button
      colorScheme="teal"
      onClick={signIn}
      isLoading={isLoading}
      spinner={<Spinner size="sm"/>}
    >
      ログイン
    </Button>
  );
}
