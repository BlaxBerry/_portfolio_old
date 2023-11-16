import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { firestoreInstance } from "@libs/firebase";
import { Typography } from "@material-tailwind/react";

function ReactSkillsList() {
  const [languagesData, languagesLoading, languagesError] = useCollectionData(
    collection(firestoreInstance, "skills/images/languages"),
  );
  const [frameworksData, frameworksLoading, frameworksError] =
    useCollectionData(
      collection(firestoreInstance, "skills/images/frameworks"),
    );

  const isLoading = useMemo<boolean>(
    () => languagesLoading || frameworksLoading,
    [languagesLoading, frameworksLoading],
  );

  const isError = useMemo<boolean>(
    () => !!languagesError || !!frameworksError,
    [languagesError, frameworksError],
  );

  if (isError) return <p>Something wrong...</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full text-white">
      {/* 1. languages */}
      <div className="mb-10">
        <Typography variant="h2">Languages</Typography>
        <hr className="my-2" />
        <div className="xl:grid-cols-18 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10">
          {languagesData
            ?.filter((skill) => skill.show)
            ?.map((item) => (
              <div
                key={item?.name}
                className="col-span-1 m-1 block rounded-xl bg-white p-1 shadow-xl shadow-blue-gray-900/50"
              >
                <img
                  src={item?.src}
                  alt={item?.name}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
        </div>
      </div>

      {/* 2. frameworks */}
      <div className="mb-10">
        <Typography variant="h2">Frameworks</Typography>
        <hr className="my-2" />
        <div className="xl:grid-cols-18 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10">
          {frameworksData
            ?.filter((skill) => skill.show)
            ?.map((item) => (
              <div
                key={item?.name}
                className="col-span-1 m-1 block rounded-xl bg-white p-1 shadow-xl shadow-blue-gray-900/50"
              >
                <img
                  src={item?.src}
                  alt={item?.name}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ReactSkillsList;
