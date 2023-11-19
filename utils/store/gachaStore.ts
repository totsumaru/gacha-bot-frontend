import { create } from "zustand";
import { EmbedReq, ResultReq } from "@/utils/api/body";

// EmbedのStoreの型です
interface embedStore {
  init: (embedReq: EmbedReq) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: string | File | null;
  setImage: (image: string | File | null) => void;
  button: {
    label: string;
    style: "PRIMARY" | "SUCCESS";
  }
  setButtonLabel: (label: string) => void;
  setButtonStyle: (style: "PRIMARY" | "SUCCESS") => void;
}

// パネルのストアです
export const usePanelStore = create<embedStore>((set, get) => ({
  init: (embedReq: EmbedReq) => {
    set({
      title: embedReq.title,
      description: embedReq.description,
      image: embedReq.image_url,
      button: {
        label: embedReq.button[0].label,
        style: embedReq.button[0].style,
      }
    })
  },
  title: "",
  setTitle: (title: string) => set({ title: title }),
  description: "",
  setDescription: (description: string) => set({ description: description }),
  image: null,
  setImage: (image: string | File | null) => set({ image: image }),
  button: { label: "ガチャを回す", style: "PRIMARY" },
  setButtonLabel: (label: string) => set({
    button: {
      label: label || "ガチャを回す",
      style: get().button.style,
    }
  }),
  setButtonStyle: (style: "PRIMARY" | "SUCCESS") => set({
    button: {
      label: get().button.label,
      style: style || "PRIMARY",
    }
  }),
}));

// Openのストアです
export const useOpenStore = create<embedStore>((set, get) => ({
  init: (embedReq: EmbedReq) => {
    set({
      title: embedReq?.title || "",
      description: embedReq.description,
      image: embedReq.image_url,
      button: {
        label: embedReq.button[0].label,
        style: embedReq.button[0].style,
      }
    })
  },
  title: "",
  setTitle: (title: string) => set({ title: title }),
  description: "",
  setDescription: (description: string) => set({ description: description }),
  image: null,
  setImage: (image: string | File | null) => set({ image: image }),
  button: { label: "結果を見る", style: "PRIMARY" },
  setButtonLabel: (label: string) => set({
    button: {
      label: label || "結果を見る",
      style: get().button.style,
    }
  }),
  setButtonStyle: (style: "PRIMARY" | "SUCCESS") => set({
    button: {
      label: get().button.label,
      style: style || "PRIMARY",
    }
  }),
}));

// Resultのストアの型です
export interface resultStore {
  title: string;
  description: string;
  image: string | File | null;
  probability: number;
  point: number;
}

interface resultStoreState {
  results: resultStore[];
  init: (resultReqs: ResultReq[]) => void;
  setTitle: (index: number, title: string) => void;
  setDescription: (index: number, description: string) => void;
  setImage: (index: number, image: string | File | null) => void;
  setProbability: (index: number, probability: number) => void;
  setPoint: (index: number, point: number) => void;
  addResult: (newResult: resultStore) => void;
  removeResult: (index: number) => void;
}

// Resultのstoreです
export const useResultStore = create<resultStoreState>((set, get) => ({
  results: [],
  init: (resultReqs: ResultReq[]) => {
    const newResults = resultReqs.map(req => ({
      title: req.embed.title,
      description: req.embed.description,
      image: req.embed.image_url,
      probability: req.probability,
      point: req.point,
    }));
    set({ results: newResults });
  },
  setTitle: (index: number, title: string) => {
    const newResults = [...get().results];
    newResults[index].title = title;
    set({ results: newResults });
  },
  setDescription: (index: number, description: string) => {
    const newResults = [...get().results];
    newResults[index].description = description;
    set({ results: newResults });
  },
  setImage: (index: number, image: string | File | null) => {
    const newResults = [...get().results];
    newResults[index].image = image;
    set({ results: newResults });
  },
  setProbability: (index: number, probability: number) => {
    const newResults = [...get().results];
    newResults[index].probability = probability;
    set({ results: newResults });
  },
  setPoint: (index: number, point: number) => {
    const newResults = [...get().results];
    newResults[index].point = point;
    set({ results: newResults });
  },
  // 新しいResultを追加する関数
  addResult: (newResult: resultStore) => {
    const currentResults = get().results;
    set({ results: [...currentResults, newResult] });
  },
  // 特定のIndexのResultを削除する関数
  removeResult: (index: number) => {
    const filteredResults = get().results.filter((_, i) => i !== index);
    set({ results: filteredResults });
  }
}));