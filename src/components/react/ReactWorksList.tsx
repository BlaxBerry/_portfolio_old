import { memo, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestoreInstance } from "@libs/firebase";
import ReactImg from "./common/ReactImg";
import ReactResultMsg from "./common/ReactResultMsg";
import { setLocalStorage } from "@utils/index";

function ReactWorksList() {
  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "works"),
  );

  const relativeStack = window.location.search.slice(1).split("=")?.[1];

  const worksList = useMemo(() => {
    if (!relativeStack) return dataSource;
    return dataSource?.filter((item) => item?.stacks?.includes(relativeStack));
  }, [dataSource, relativeStack]);

  return (
    <>
      <ReactResultMsg isError={Boolean(error)} isLoading={loading}>
        {!worksList?.length && (
          <>
            {relativeStack && (
              <Typography variant="h5">
                Not Found Works Based on <strong>{relativeStack}</strong>
              </Typography>
            )}
            <RefreshWorkPageMemo />
          </>
        )}
      </ReactResultMsg>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {worksList?.map((item) => (
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

      {!!worksList?.length && relativeStack && <RefreshWorkPageMemo />}
    </>
  );
}

function RefreshWorkPage() {
  return (
    <div className="py-10 text-center">
      <a href="/portfolio/works">
        <Button>Check All Works</Button>
      </a>
    </div>
  );
}

const RefreshWorkPageMemo = memo(RefreshWorkPage);
const ReactWorksListMemo = memo(ReactWorksList);

export default ReactWorksListMemo;
