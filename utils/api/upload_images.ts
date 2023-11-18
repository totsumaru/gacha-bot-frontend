type Props = {
  serverId: string
  accessToken: string
  imageFiles: File[]
}

// 複数の画像をアップロードし、URLの配列を返す関数
export async function uploadImages({ serverId, accessToken, imageFiles }: Props): Promise<string[]> {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    // フォームデータに画像を追加
    formData.append(`images`, file);
  });

  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/images?server_id=" + serverId;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('画像のアップロードに失敗しました');
  }

  const data = await response.json();
  return data.urls; // 画像のURL配列を返す
}
