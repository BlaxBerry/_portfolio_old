import { memo, useCallback, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { firestoreInstance } from "@libs/firebase";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE } from "src/constants";
import type { SkillDocumentType } from "src/types/firestore";
import ReactResultMsg from "./common/ReactResultMsg";

function ReactSkillsList() {
  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "skills"),
  );

  const getSkillsList = useCallback(
    (belongTo: SkillDocumentType["belongTo"]) => {
      return dataSource
        ?.filter(({ show }) => show)
        ?.filter((skill) => skill.belongTo === belongTo) as SkillDocumentType[];
    },
    [dataSource],
  );

  return (
    <>
      <ReactResultMsg isError={Boolean(error)} isLoading={loading} />

      <div className="w-full text-white">
        {/* 1. languages & runtimes */}
        <div className="mb-10">
          <Typography variant="h3">Languages & Runtimes</Typography>
          <hr className="my-2" />
          <SkillBlockMemo
            list={getSkillsList("language")?.concat(getSkillsList("runtime"))}
          />
        </div>

        {/* 2. frameworks & lis */}
        <div className="mb-10">
          <Typography variant="h3">Frameworks & Libraries</Typography>
          <hr className="my-2" />
          <SkillBlockMemo list={getSkillsList("framework")} />
        </div>

        {/* 2. devops */}
        <div className="mb-10">
          <Typography variant="h3">DevOps</Typography>
          <hr className="my-2" />
          <SkillBlockMemo list={getSkillsList("devops")} />
        </div>
      </div>
    </>
  );
}

function SkillBlock(props: { list: SkillDocumentType[] }) {
  return (
    <div className="xl:grid-cols-18 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10">
      {props.list?.map((item) => (
        <a key={item?.name} href={`/portfolio/works?stack=${item.name}`}>
          <div className="col-span-1 m-1 block rounded-xl bg-white p-1 shadow-xl shadow-blue-gray-900/50">
            <img
              src={item?.src}
              alt={item?.name}
              loading="lazy"
              draggable={false}
            />
          </div>
        </a>
      ))}
    </div>
  );
}

const SkillBlockMemo = memo(SkillBlock);

export default ReactSkillsList;
