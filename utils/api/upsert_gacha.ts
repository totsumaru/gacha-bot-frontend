import { GachaReq } from "@/utils/api/body";

// ガチャをUpsertします
export async function upsertGacha(gachaReq: GachaReq): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/gacha/upsert?gacha_id=" + gachaReq.id;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gachaReq),
  });

  if (!response.ok) {
    throw new Error('ガチャの作成に失敗しました');
  }
}