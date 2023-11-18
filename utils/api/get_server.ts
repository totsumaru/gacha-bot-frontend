type Props = {
  serverId: string
  accessToken: string
}

type Res = {
  id: string
  subscriber_id: string
  stripe: {
    customer_id: string
    subscription_id: string
  }
  is_subscriber: boolean
}

// サーバーの情報を取得します
export async function getServer({ serverId, accessToken }: Props): Promise<Res> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/server?server_id=" + serverId
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    throw new Error('ガチャの取得に失敗しました');
  }

  return await response.json();
}