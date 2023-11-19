import { memo, useEffect, type ReactNode } from "react";
import { Typography } from "@material-tailwind/react";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE, TRANSLATIONS } from "src/constants";

/* 页面居中定位 */
function ReactResultMsg(props: {
  isError?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
}) {
  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const message = TRANSLATIONS[language]?.components?.results;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-center text-white">
      {props.isLoading && (
        <Typography variant="h5">{message?.loading}</Typography>
      )}
      {props.isError && <Typography variant="h5">{message?.error}</Typography>}

      {props.children}
    </div>
  );
}

const ReactResultMsgMemo = memo(ReactResultMsg);
export default ReactResultMsgMemo;
