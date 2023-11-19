import { memo, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE, TRANSLATIONS } from "src/constants";

function ReactHomeDescription() {
  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const message = TRANSLATIONS[language]?.pages?.home;

  return (
    <Typography variant="lead">
      {message?.description?.[0]}
      <br />
      {message?.description?.[1]}
      <br />
      {message?.description?.[2]}
    </Typography>
  );
}

const ReactHomeDescriptionMemo = memo(ReactHomeDescription);

export default ReactHomeDescriptionMemo;
