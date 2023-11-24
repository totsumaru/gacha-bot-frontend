type ServerRes = {
  id: string;
  name: string;
  icon_url: string;
  subscriber: {
    user_name: string;
    avatar_url: string;
  };
}

// サーバーのリストを取得します
export async function getAdminServers(accessToken: string): Promise<ServerRes[]> {
  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/admin/servers";
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    throw new Error('サーバーの取得に失敗しました');
  }

  return await response.json();
}
