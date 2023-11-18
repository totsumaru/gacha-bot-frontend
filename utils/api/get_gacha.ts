import { GachaRes } from "@/utils/api/body";

type Props = {
  serverId: string
  accessToken: string
}

// ガチャを取得します
export async function getGacha({ serverId, accessToken }: Props): Promise<GachaRes> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/gacha?server_id=" + serverId
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