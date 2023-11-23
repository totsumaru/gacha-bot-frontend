import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import { useOpenStore } from "@/utils/store/gachaStore";
import ButtonDrawer from "@/components/embed/buttonDrawer/ButtonDrawer";

/**
 * OpenのEmbedです
 */
export default function OpenEmbed() {
  const openStore = useOpenStore();

  const btns = [(
    <ButtonDrawer
      label={openStore.button.label}
      setLabel={(label) => openStore.updateStore({
        button: { ...openStore.button, label: label }
      })}
      style={openStore.button.style}
      setStyle={(color) => openStore.updateStore({
        button: { ...openStore.button, style: color }
      })}
    />
  )]

  return (
    <DiscordEmbedUI
      title={openStore.title}
      setTitle={(title) => openStore.updateStore({
        title: title,
      })}
      description={openStore.description}
      setDescription={(description) => openStore.updateStore({
        description: description,
      })}
      file={openStore.image}
      setFile={(file) => openStore.updateStore({
        image: file,
      })}
      buttons={btns}
    />
  )
}