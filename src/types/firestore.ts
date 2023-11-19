type Language = "zhCN" | "enUS" | "jaJP";

export interface SkillDocumentType {
  name: string;
  src: string;
  show: boolean; // 默认显示
  belongTo: "language" | "framework" | "runtime" | "devops";
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
  keywords: Array<"Frontend" | "Backend" | "DevOps">;
  achievements: {
    [K in Language]: string[];
  };
}
