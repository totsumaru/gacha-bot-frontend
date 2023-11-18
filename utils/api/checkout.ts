type Props = {
  serverId: string
  accessToken: string
}

// チェックアウトを作成します
export async function checkout(
  { serverId, accessToken }: Props
): Promise<string> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/checkout?server_id=" + serverId;
  console.log("エンドポイント: ", endpoint)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (!response.ok) {
    throw new Error('チェックアウトの作成に失敗しました');
  }

  type res = {
    redirect_url: string
  }
  const r: res = await response.json()

  return r.redirect_url
}