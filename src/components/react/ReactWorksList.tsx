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
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import ReactImg from "./common/ReactImg";
import ReactResultMsg from "./common/ReactResultMsg";
import type { WorkDocumentType } from "src/types/firestore";

function ReactWorksList() {
  const { language } = useStore($store);

  const [dataSource, loading, error] = useCollectionData(
    collection(firestoreInstance, "works"),
  );

  const relativeStack = window.location.search.slice(1).split("=")?.[1];

  const worksList = useMemo(() => {
    if (!relativeStack) return dataSource as WorkDocumentType[];
    return dataSource?.filter(
      (item) => item?.stacks?.includes(relativeStack),
    ) as WorkDocumentType[];
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
            key={item?.id}
            className="col-span-1 m-2"
            href={`/portfolio/works/detail?id=${item?.id}`}
            onClick={() => $store.setKey("selectedWork", item)}
          >
            <Card>
              <CardHeader floated={false}>
                <ReactImg
                  src={item?.metaData?.images?.[0] ?? ""}
                  alt={item?.id}
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="truncate">
                  {item?.name?.[language] ?? "..."}
                </Typography>
                <Typography variant="h6" color="blue-gray" textGradient>
                  {item?.period?.start || item?.period?.end ? (
                    <>
                      {`${item?.period?.start ?? ""} ~ ${
                        item?.period?.end ?? ""
                      } `}
                    </>
                  ) : (
                    "..."
                  )}
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
