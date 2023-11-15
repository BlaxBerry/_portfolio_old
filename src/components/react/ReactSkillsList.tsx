import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { firestoreInstance } from "@libs/firebase";
import ReactImg from "./ReactImg";
import { setLocalStorage } from "@utils/storages";
function ReactSkillsList() {
  const [languagesData, languagesLoading, languagesError] = useCollectionData(
    collection(firestoreInstance, "skills/images/languages"),
  );
  const [frameworksData, frameworksLoading, frameworksError] =
    useCollectionData(
      collection(firestoreInstance, "skills/images/frameworks"),
    );
  const [databaseCloudData, databaseCloudLoading, databaseCloudError] =
    useCollectionData(
      collection(firestoreInstance, "skills/images/database&cloud"),
    );
  const [toolsData, toolsLoading, toolsError] = useCollectionData(
    collection(firestoreInstance, "skills/images/tools"),
  );

  const skillsList = useMemo(() => {
    if (languagesData && frameworksData && databaseCloudData && toolsData) {
      const all = [
        ...languagesData,
        ...frameworksData,
        ...databaseCloudData,
        ...toolsData,
      ];
      setLocalStorage({
        skills: all,
      });
      return all.filter((skill) => skill.show);
    } else return [];
  }, [languagesData, frameworksData, databaseCloudData, toolsData]);

  const isLoading = useMemo<boolean>(
    () =>
      languagesLoading ||
      frameworksLoading ||
      databaseCloudLoading ||
      toolsLoading,
    [languagesLoading, frameworksLoading, databaseCloudLoading, toolsLoading],
  );

  const isError = useMemo<boolean>(
    () =>
      !!languagesError ||
      !!frameworksError ||
      !!databaseCloudError ||
      !!toolsError,
    [languagesError, frameworksError, databaseCloudError, toolsError],
  );

  if (isError) return <p>Something wrong...</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="xl:grid-cols-18 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10">
      {skillsList?.map((item) => (
        <div
          key={item?.name}
          className="col-span-1 m-1 block rounded-xl bg-white/50 p-1 shadow-xl shadow-blue-gray-900/50"
        >
          <ReactImg src={item?.src} alt={item?.name} />
        </div>
      ))}
    </div>
  );
}

export default ReactSkillsList;
