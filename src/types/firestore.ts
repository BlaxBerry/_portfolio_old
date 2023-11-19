export type Language = "en" | "ja" | "zh" | "ko";

export interface SkillDocumentType {
  name: string;
  src: string;
  show: boolean; // 默认显示
  belongTo: "language" | "framework" | "runtime" | "devops";
}

export interface WorkDocumentType {
  id: string;
  name: Record<Language, string>;
  stacks: string[];
  keywords: Array<"Frontend" | "Backend" | "DevOps">;
  achievements: Record<Language, string[]>;
  period: {
    start: string;
    end: string;
  };
  metaData: {
    siteUrl: string;
    favicon: string;
    description: Record<Language, string>;
    images: string[];
  };
}
