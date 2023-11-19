import { persistentMap } from "@nanostores/persistent";
import { DEFAULT_LANGUAGE } from "src/constants";
import type { Language, WorkDocumentType } from "src/types/firestore";

interface StoreState {
  language: Language;
  selectedWork: WorkDocumentType | undefined;
}

const DEFAULT_STORE_KEY = "blaxberry_portfolio:";
const DEFAULT_STORE_STATE: StoreState = {
  language: DEFAULT_LANGUAGE,
  selectedWork: undefined,
};

export const $store = persistentMap<StoreState>(
  DEFAULT_STORE_KEY,
  DEFAULT_STORE_STATE,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
