/**
 * バックエンドに送信するbodyの構造体です
 */

// ガチャのリクエスト
export interface GachaReq {
  id: string;
  server_id: string;
  panel: EmbedReq;
  open: EmbedReq;
  result: ResultReq[];
}

// 結果のリクエスト
export interface ResultReq {
  embed: EmbedReq;
  point: number;
  probability: number;
}

// ガチャの埋め込みのリクエスト
export interface EmbedReq {
  title: string;
  description: string;
  color: number;
  image_url: string;
  thumbnail_url: string;
  button: ButtonReq[];
}

// ボタンのリクエスト
export interface ButtonReq {
  kind: string;
  label: string;
  style: string;
}

// 複数の画像をアップロードし、URLの配列を返す関数
export async function uploadImages(imageFiles: File[]): Promise<string[]> {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    // フォームデータに画像を追加
    formData.append(`images`, file);
  });

  const response = await fetch('http://localhost:8080/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('画像のアップロードに失敗しました');
  }

  const data = await response.json();
  return data.urls; // 画像のURL配列を返す
}