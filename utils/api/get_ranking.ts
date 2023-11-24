type RankingItem = {
  user_name: string;
  avatar_url: string;
  point: number;
  rank: number;
};

type Res = RankingItem[];

type Props = {
  serverId: string;
};

// ランキングを取得します
export async function getRanking({ serverId }: Props): Promise<Res> {
  const endpoint = `${process.env.NEXT_PUBLIC_BE_URL}/api/gacha/ranking?server_id=${serverId}`;
  const response = await fetch(endpoint, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('ランキングの取得に失敗しました');
  }

  return await response.json();
}
