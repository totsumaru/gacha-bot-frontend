import { GachaRes } from "@/utils/api/body";

// ガチャを取得します
export async function getGacha(gachaId: string): Promise<GachaRes> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/gacha?gacha_id=" + gachaId
  const response = await fetch(endpoint, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('ガチャの取得に失敗しました');
  }

  return await response.json();
}