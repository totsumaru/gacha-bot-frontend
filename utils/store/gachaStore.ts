import { create } from "zustand";
import { ButtonStyle, EmbedReq, ResultReq } from "@/utils/api/body";

// EmbedのStoreの型です
interface embedStore {
  title: string;
  description: string;
  image: string | File | null;
  button: {
    label: string;
    style: ButtonStyle;
    url: string;
    is_visible: boolean;
  };
  init: (embedReq: EmbedReq) => void;
  // ストア全体を更新する関数
  updateStore: (update: Partial<embedStore>) => void;
}


// パネルのストアです
//
// ボタンのラベルを更新する場合は、以下のようにしてください。
//
// usePanelStore.getState().updateStore({
//  button: {
//    ...usePanelStore.getState().button,
//    label: '新しいラベル'
//  }
// });
export const usePanelStore = create<embedStore>((set) => ({
  title: '',
  description: '',
  image: null,
  button: {
    label: '',
    style: 'PRIMARY', // 初期値
    url: '',
    is_visible: false,
  },
  updateStore: (update) => {
    set((state) => ({ ...state, ...update }));
  },
  init: (embedReq: EmbedReq) => {
    set({
      title: embedReq.title,
      description: embedReq.description,
      image: embedReq.image_url,
      button: {
        label: embedReq.button[0].label,
        style: embedReq.button[0].style,
        url: "",
        is_visible: false,
      }
    });
  },
}));

// Openのストアです
export const useOpenStore = create<embedStore>((set) => ({
  title: "",
  description: "",
  image: null,
  button: {
    label: "結果を見る",
    style: "PRIMARY",
    url: "",
    is_visible: false,
  },
  updateStore: (update) => {
    set((state) => ({ ...state, ...update }));
  },
  init: (embedReq: EmbedReq) => {
    set({
      title: embedReq?.title || "",
      description: embedReq.description,
      image: embedReq.image_url,
      button: {
        label: embedReq.button[0].label,
        style: embedReq.button[0].style,
        url: "",
        is_visible: false,
      }
    });
  },
}));

// Resultのストアの型です
interface resultStore {
  title: string;
  description: string;
  image: string | File | null;
  button: {
    label: string;
    style: ButtonStyle;
    url: string;
    is_visible: boolean;
  };
  probability: number;
  point: number;
}

interface resultStoreState {
  results: resultStore[];
  init: (resultReqs: ResultReq[]) => void;
  updateStore: (index: number, update: Partial<resultStore>) => void;
  addResult: (newResult: resultStore) => void;
  removeResult: (index: number) => void;
}

// Resultのstoreです
//
// index:0のタイトルを変更する場合は以下のように書きます。
//
// useResultStore.getState().updateStore(0, { title: '新しいタイトル' });
export const useResultStore = create<resultStoreState>((set, get) => ({
  results: [],
  init: (resultReqs: ResultReq[]) => {
    const newResults = resultReqs.map(req => ({
      title: req.embed.title,
      description: req.embed.description,
      image: req.embed.image_url,
      button: {
        label: req.embed.button?.[0]?.label,
        style: req.embed.button?.[0]?.style || "LINK",
        url: req.embed.button?.[0]?.url,
        is_visible: req.embed.button?.[0]?.is_visible,
      },
      probability: req.probability,
      point: req.point,
    }));
    set({ results: newResults });
  },
  updateStore: (index, update) => {
    const newResults = [...get().results];
    newResults[index] = { ...newResults[index], ...update };
    set({ results: newResults });
  },
  addResult: (newResult) => {
    const currentResults = get().results;
    set({ results: [...currentResults, newResult] });
  },
  removeResult: (index) => {
    const filteredResults = get().results.filter((_, i) => i !== index);
    set({ results: filteredResults });
  },
}));

interface roleStore {
  id: string
  point: number
}

interface roleStoreState {
  roles: roleStore[];
  init: (roles: roleStore[]) => void;
  updateStore: (index: number, update: Partial<roleStore>) => void;
  addRole: (newRole: roleStore) => void;
  removeRole: (index: number) => void;
}

// Roleのstoreです
//
// pointを更新する場合は以下のように書きます。
//
// useRoleStore.getState().updateStore(0, { point: 100 });
export const useRoleStore = create<roleStoreState>((set, get) => ({
  roles: [],
  init: (roles: roleStore[]) => {
    set({ roles: roles });
  },
  updateStore: (index, update) => {
    const newRoles = [...get().roles];
    newRoles[index] = { ...newRoles[index], ...update };
    set({ roles: newRoles });
  },
  addRole: (newRole) => {
    const currentRoles = get().roles;
    set({ roles: [...currentRoles, newRole] });
  },
  removeRole: (index) => {
    const filteredRoles = get().roles.filter((_, i) => i !== index);
    set({ roles: filteredRoles });
  },
}));
