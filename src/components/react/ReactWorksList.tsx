import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { firestoreInstance } from "@libs/firebase";

function ReactWorksList() {
  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "works"),
  );

  if (error) return <p>{error?.message}</p>;
  if (loading) return <p>loading...</p>;
  return (
    <>
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {dataSource?.map((item) => (
            <a key={item.metaData.id} href="#" className="col-span-1 m-2">
              <Card>
                <CardHeader floated={false}>
                  <img
                    src={item?.images[0]}
                    loading="lazy"
                    alt={item?.metaData?.id}
                    draggable={false}
                    className="h-220"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="truncate"
                  >
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
      )}
    </>
  );
}

export default ReactWorksList;
