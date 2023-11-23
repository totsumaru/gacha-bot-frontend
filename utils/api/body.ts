/**
 * バックエンドに送信するbodyの構造体です
 */

export type ButtonKind = "to_open" | "to_result" | "none"
export type ButtonStyle = "PRIMARY" | "SUCCESS" | "LINK"

// ガチャのレスポンス
export interface GachaRes {
  id: string;
  server_id: string;
  panel: EmbedReq;
  open: EmbedReq
  result: ResultReq[];
  role: RoleWithPointRes[];
  all_role: RoleRes[];
}

// ガチャのリクエスト
export interface GachaReq {
  id: string;
  server_id: string;
  panel: EmbedReq;
  open: EmbedReq
  result: ResultReq[];
  role: RoleWithPointReq[];
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
  url: string;
  is_hidden: boolean;
}

// ロールのリクエスト
export interface RoleWithPointReq {
  id: string;
  point: number;
}

// ロールのレスポンス
export interface RoleWithPointRes {
  id: string;
  name: string;
  point: number;
}

// 全てのロール
export interface RoleRes {
  id: string;
  name: string;
}
