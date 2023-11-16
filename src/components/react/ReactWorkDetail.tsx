import { useEffect } from "react";
import { Carousel, Chip, Typography } from "@material-tailwind/react";
import { getLocalStorage, type LocalDataType } from "@utils/storages";

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
    <div className="text-white">
      {/* 1. name */}
      <div className="pb-4 pt-8">
        <Typography variant="h2">{selectedWork?.name["enUS"]}</Typography>
      </div>

      {/* 2. stacks area */}
      <div className="mb-4 flex space-x-1">
        {selectedWork?.stacksArea?.map((s) => (
          <Chip key={s} value={s} className="rounded-full" />
        ))}
      </div>

      {/* 3. images */}
      <div className="mb-10">
        <Carousel className="rounded-xl">
          {selectedWork?.images?.map((src, i) => (
            <img
              key={i}
              src={src || "/portfolio/assets/background.webp"}
              alt={selectedWork?.metaData?.id}
            />
          ))}
        </Carousel>
      </div>

      {/* 4. description */}
      <div className="mb-10">
        <Typography variant="h3">Description</Typography>
        <hr className="my-2" />
        <Typography variant="lead">
          {selectedWork?.metaData?.description?.["enUS"]}
        </Typography>
      </div>

      {/* 5. skills stacks */}
      <div className="mb-10">
        <Typography variant="h3">Technologies I Used</Typography>
        <hr className="my-2" />
        <ul className="pl-4">
          {selectedWork?.stacks?.map((skill) => (
            <li key={skill} className="list-disc">
              <Typography variant="lead">{skill}</Typography>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. achievements */}
      <div className="mb-40">
        <Typography variant="h3">What I Did</Typography>
        <hr className="my-2" />
        <ul>
          {selectedWork?.achievements?.["enUS"]?.map((s: string, i: number) => (
            <li key={i}>
              <Typography variant="lead">{s}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReactWorkDetail;
