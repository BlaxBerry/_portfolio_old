import { memo, useMemo } from "react";
import { Typography } from "@material-tailwind/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { firestoreInstance } from "@libs/firebase";
import type { SkillDocumentType } from "src/types/firestore";
import ReactResultMsg from "./common/ReactResultMsg";

function ReactSkillsList() {
  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "skills"),
  );

  const skillsList = useMemo(
    () => dataSource?.filter(({ show }) => show) as SkillDocumentType[],
    [dataSource],
  );

  const languages = useMemo(
    () => skillsList?.filter(({ belongTo }) => belongTo === "language"),
    [skillsList],
  );
  const runtimes = useMemo(
    () => skillsList?.filter(({ belongTo }) => belongTo === "runtime"),
    [skillsList],
  );
  const frameworks = useMemo(
    () => skillsList?.filter(({ belongTo }) => belongTo === "framework"),
    [skillsList],
  );
  const devops = useMemo(
    () => skillsList?.filter(({ belongTo }) => belongTo === "devops"),
    [skillsList],
  );

  return (
    <>
      <ReactResultMsg isError={Boolean(error)} isLoading={loading} />

      <div className="w-full text-white">
        {/* 1. languages & runtimes */}
        <div className="mb-10">
          <Typography variant="h3">Languages & Runtimes </Typography>
          <hr className="my-2" />
          <SkillBlockMemo list={languages?.concat(runtimes)} />
        </div>

        {/* 2. frameworks & lis */}
        <div className="mb-10">
          <Typography variant="h3">Frameworks & Libraries</Typography>
          <hr className="my-2" />
          <SkillBlockMemo list={frameworks} />
        </div>

        {/* 2. devops */}
        <div className="mb-10">
          <Typography variant="h3">DevOps</Typography>
          <hr className="my-2" />
          <SkillBlockMemo list={devops} />
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
