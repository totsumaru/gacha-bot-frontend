import { GachaReq } from "@/utils/api/body";

type Props = {
  serverId: string
  accessToken: string
}

// ガチャをUpsertします
export async function upsertGacha(
  gachaReq: GachaReq,
  { serverId, accessToken }: Props
): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/gacha/upsert?server_id=" + serverId;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(gachaReq),
  });

  if (!response.ok) {
    throw new Error('ガチャの作成に失敗しました');
  }
}