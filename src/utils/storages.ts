import type { WorkDocumentType, SkillDocumentType } from "src/types/firestore";

const KEY = "blackberry-portfolio";
const defaultValue: LocalDataType = {
  selectedWork: undefined,
  skills: [],
};

export type LocalDataType = {
  selectedWork: WorkDocumentType | undefined;
  skills: SkillDocumentType[];
};

export const getLocalStorage = <T = any>() => {
  const dataStr = localStorage.getItem(KEY);
  if (!dataStr) return defaultValue;
  return JSON.parse(dataStr) as T;
};

export const setLocalStorage = <T>(data: T): void => {
  const localData = getLocalStorage();
  localStorage.setItem(
    KEY,
    JSON.stringify({
      ...localData,
      ...data,
    }),
  );
};
