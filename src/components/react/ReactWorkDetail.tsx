import { useEffect } from "react";
import { Carousel, Chip, Typography } from "@material-tailwind/react";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE, TRANSLATIONS } from "src/constants";

function ReactWorkDetail() {
  const { language, selectedWork } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
    if (!selectedWork) window.location.replace("/portfolio/works");
  }, [language, selectedWork]);

  const message = TRANSLATIONS[language]?.pages?.workDetail;

  return (
    <div className="text-white">
      {/* 1. name */}
      <div className="pb-4 pt-8">
        <Typography variant="h2">
          {selectedWork?.name?.[language] ?? "..."}
        </Typography>
      </div>

      {/* 2. keywords */}
      <div className="mb-4 flex space-x-1">
        {selectedWork?.keywords?.map((key) => (
          <Chip key={key} value={key} className="rounded-full" />
        ))}
      </div>

      {/* 3. images */}
      <div className="mb-10">
        <Carousel className="rounded-xl">
          {selectedWork?.metaData?.images?.map((src, i) => (
            <img
              key={i}
              src={src || "/portfolio/assets/background.webp"}
              alt={selectedWork?.id}
            />
          ))}
        </Carousel>
      </div>

      {/* 4. description */}
      <div className="mb-10">
        <Typography variant="h3">{message.description}</Typography>
        <hr className="my-2" />
        <Typography variant="lead">
          {selectedWork?.metaData?.description?.[language] ?? "..."}
        </Typography>
      </div>

      {/* 5. skills stacks */}
      <div className="mb-10">
        <Typography variant="h3">{message.stacks}</Typography>
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
        <Typography variant="h3">{message.achievements}</Typography>
        <hr className="my-2" />
        <ul>
          {selectedWork?.achievements?.[language]?.map(
            (s: string, i: number) => (
              <li key={i}>
                <Typography variant="lead">{s ?? "..."}</Typography>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

export default ReactWorkDetail;
