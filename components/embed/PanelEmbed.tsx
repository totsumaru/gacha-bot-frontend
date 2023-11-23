import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import { usePanelStore } from "@/utils/store/gachaStore";
import ButtonDrawer from "@/components/embed/ButtonDrawer";
import PointCheckButtonDrawer from "@/components/embed/PointCheckButtonDrawer";

/**
 * パネルのEmbedです
 */
export default function PanelEmbed() {
  const panelStore = usePanelStore();

  const btns = [(
    <ButtonDrawer
      label={panelStore.button.label}
      setLabel={(label) => {
        panelStore.updateStore({
          button: { ...panelStore.button, label: label }
        })
      }}
      style={panelStore.button.style}
      setStyle={(color) => panelStore.updateStore({
        button: { ...panelStore.button, style: color }
      })}
    />
  ), (
    <PointCheckButtonDrawer/>
  )]

  return (
    <DiscordEmbedUI
      title={panelStore.title}
      setTitle={(title) => panelStore.updateStore({
        title: title,
      })}
      description={panelStore.description}
      setDescription={(description) => panelStore.updateStore({
        description: description,
      })}
      file={panelStore.image}
      setFile={(file) => panelStore.updateStore({
        image: file,
      })}
      buttons={btns}
    />
  )
}