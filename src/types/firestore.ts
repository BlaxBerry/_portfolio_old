type Language = "zhCN" | "enUS" | "jaJP";

export interface SkillDocumentType {
  name: string;
  src: string;
  show: boolean; // 默认显示
}

export interface WorkDocumentType {
  metaData: {
    id: string;
    siteUrl: string;
    favicon: string;
    period: {
      start: string;
      end: string;
    };
    description: {
      [K in Language]: string;
    };
  };
  name: {
    [K in Language]: string;
  };
  images: string[];
  stacks: string[];
  achievements: {
    [K in Language]: string[];
  };
}
