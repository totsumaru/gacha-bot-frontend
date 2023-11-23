import { useResultStore } from "@/utils/store/gachaStore";
import DiscordEmbedUI from "@/components/embed/DiscordEmbedUI";
import LinkButtonDrawer from "@/components/embed/buttonDrawer/LinkButtonDrawer";

type Props = {
  index: number;
}

/**
 * ResultのEmbedです
 */
export default function ResultEmbed({ index }: Props) {
  const resultStore = useResultStore();

  const btns = [(
    <LinkButtonDrawer
      label={resultStore.results[index].button.label}
      setLabel={(label) => resultStore.updateStore(index, {
        button: { ...resultStore.results[index].button, label: label }
      })}
      url={resultStore.results[index].button.url}
      setURL={(url) => resultStore.updateStore(index, {
        button: { ...resultStore.results[index].button, url: url }
      })}
      isHidden={resultStore.results[index].button.is_hidden}
      setIsHidden={(isHidden) => resultStore.updateStore(index, {
        button: { ...resultStore.results[index].button, is_hidden: isHidden }
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