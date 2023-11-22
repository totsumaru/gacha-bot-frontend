/**
 * バックエンドに送信するbodyの構造体です
 */

export type ButtonKind = "to_open" | "to_result"
export type ButtonStyle = "PRIMARY" | "SUCCESS"

// ガチャのレスポンス
export interface GachaRes {
  id: string;
  server_id: string;
  panel: EmbedReq;
  open: EmbedReq
  result: ResultReq[];
}

// ガチャのリクエスト
export interface GachaReq {
  id: string;
  server_id: string;
  panel: EmbedReq;
  open: EmbedReq
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
  kind: ButtonKind;
  label: string;
  style: ButtonStyle;
}

// ロールのリクエスト
export interface RoleReq {
  id: string;
  point: number;
}