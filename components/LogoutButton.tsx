"use client"

import { Button, Spinner } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter()

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(`エラーが発生しました: ${error.message}`);
      }
      router.push("/")
    } catch (e) {
      alert(`エラーが発生しました`);
    }
  };

  return (
    <Button
      colorScheme="teal"
      onClick={signOut}
      isLoading={isLoading}
      variant={"outline"}
      spinner={<Spinner size="sm"/>}
    >
      ログアウト
    </Button>
  );
}
