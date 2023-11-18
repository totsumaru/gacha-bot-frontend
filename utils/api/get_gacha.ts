import { GachaRes } from "@/utils/api/body";

// ガチャを取得します
export async function getGacha(serverId: string): Promise<GachaRes> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/gacha?server_id=" + serverId
  const response = await fetch(endpoint, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('ガチャの取得に失敗しました');
  }

  return await response.json();
}