import { create } from "zustand";
import { EmbedReq } from "@/utils/api/body";

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
  button: { label: "ガチャを引く", style: "PRIMARY" },
  setButtonLabel: (label: string) => set({
    button: {
      label: label || "ガチャを引く",
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

export const useOpenStore = create<embedStore>((set, get) => ({
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
  button: { label: "OPEN", style: "PRIMARY" },
  setButtonLabel: (label: string) => set({
    button: {
      label: label || "OPEN",
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