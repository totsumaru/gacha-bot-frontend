import { useResultStore } from "@/utils/store/gachaStore";
import ButtonDrawer from "@/components/embed/ButtonDrawer";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";

type Props = {
  index: number;
}

/**
 * ResultのEmbedです
 */
export default function ResultEmbed({ index }: Props) {
  const resultStore = useResultStore();

  const btns = [(
    <ButtonDrawer
      label={resultStore.results[index].button.label}
      setLabel={(label) => resultStore.updateStore(index, {
        button: { ...resultStore.results[index].button, label: label }
      })}
      style={resultStore.results[index].button.style}
      setStyle={(color) => resultStore.updateStore(index, {
        button: { ...resultStore.results[index].button, style: color }
      })}
    />
  )]

  return (
    <DiscordEmbedUI
      title={resultStore.results[index].title}
      setTitle={(title) => resultStore.updateStore(index, {
        title: title,
      })}
      description={resultStore.results[index].description}
      setDescription={(description) => resultStore.updateStore(index, {
        description: description,
      })}
      file={resultStore.results[index].image}
      setFile={(image) => resultStore.updateStore(index, {
        image: image,
      })}
      buttons={btns}
    />
  )
}