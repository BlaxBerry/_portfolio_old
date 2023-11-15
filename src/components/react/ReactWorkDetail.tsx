import { Chip, Typography } from "@material-tailwind/react";
import { getLocalStorage, type LocalDataType } from "@utils/storages";
import ReactImg from "./ReactImg";
import { useEffect } from "react";

function ReactWorkDetail() {
  // const workId = window.location.search.slice(1);
  const localData = getLocalStorage<LocalDataType>();
  const { selectedWork } = localData;

  useEffect(() => {
    if (!localData?.selectedWork) {
      window.location.replace("/portfolio/works");
    }
  }, []);

  return (
    <div className="text-gray-100">
      <div className="py-4">
        <Typography variant="h2" className="mb-2">
          {selectedWork?.name["enUS"]}
        </Typography>

        <div className="flex space-x-1">
          {selectedWork?.stacks?.map((s) => (
            <Chip key={s} value={s} className="rounded-full" />
          ))}
        </div>
      </div>

      <div className="mb-8 flex overflow-x-scroll">
        {selectedWork?.images?.map((src, i) => (
          <ReactImg
            key={i}
            src={src ?? ""}
            alt={selectedWork?.metaData?.id ?? ""}
          />
        ))}
      </div>

      <div>
        {selectedWork?.achievements?.["enUS"]?.map((s: string, i: number) => (
          <p key={i}>{s}</p>
        ))}
      </div>
    </div>
  );
}

export default ReactWorkDetail;
