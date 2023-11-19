import { Typography } from "@material-tailwind/react";
import { memo, type ReactNode } from "react";

/* 页面居中定位 */
function ReactResultMsg(props: {
  isError?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-center text-white">
      {props.isLoading && <Typography variant="h5">Loading...</Typography>}
      {props.isError && (
        <Typography variant="h5">Something Wrong...</Typography>
      )}

      {props.children}
    </div>
  );
}

const ReactResultMsgMemo = memo(ReactResultMsg);
export default ReactResultMsgMemo;
