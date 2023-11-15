import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { firestoreInstance } from "@libs/firebase";
import ReactImg from "./ReactImg";
import { setLocalStorage } from "@utils/index";

function ReactWorksList() {
  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "works"),
  );

  if (error) return <p>{error?.message}</p>;
  if (loading) return <p>loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {dataSource?.map((item) => (
        <a
          key={item.metaData.id}
          className="col-span-1 m-2"
          href={`/portfolio/works/detail?${item.metaData.id}`}
          onClick={() => setLocalStorage({ selectedWork: item })}
        >
          <Card>
            <CardHeader floated={false}>
              <ReactImg src={item?.images[0]} alt={item?.metaData?.id} />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" color="blue-gray" className="truncate">
                {item?.name["enUS"]}
              </Typography>
              <Typography variant="h6" color="blue-gray" textGradient>
                {`${item?.metaData?.period?.start} ~ ${item?.metaData?.period?.end}`}
              </Typography>
            </CardBody>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default ReactWorksList;
