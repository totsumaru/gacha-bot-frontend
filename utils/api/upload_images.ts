// 複数の画像をアップロードし、URLの配列を返す関数
export async function uploadImages(imageFiles: File[]): Promise<string[]> {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    // フォームデータに画像を追加
    formData.append(`images`, file);
  });

  const endpoint = process.env.NEXT_PUBLIC_BE_URL + "/api/images"
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('画像のアップロードに失敗しました');
  }

  const data = await response.json();
  return data.urls; // 画像のURL配列を返す
}
