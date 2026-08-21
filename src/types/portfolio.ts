export interface ProjectItem {
  id?: string;
  seq?: string;
  order?: number;
  title: string;
  caption: string;
  category: string;
  image: string;
  detailImages?: string[];        // 프로젝트 상세 이미지 URL/경로 목록
  date: string;
  alt: string;
  link?: string;                 // 프로젝트 관련 링크 (웹사이트, 라이브 데모 등)
}

export interface DesignPillar {
  num: string;
  title: string;
  subtitle?: string;
  desc: string;
  icon?: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  bio: string;
  tickerKeywords?: string[];
  designPillars?: DesignPillar[];
}

export interface ExperienceItem {
  month: string;
  client: string;
  description: string;
}

export interface ExperienceYear {
  year: string;
  items: ExperienceItem[];
}

export interface AboutInfo {
  image?: string;
  intro: string;
  tools: string[];
  skills: string[];
  clients: string[];
  experience: ExperienceYear[];
}

export interface ContactInfo {
  headline: string;
  email: string;
  address: string;
  note: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  about: AboutInfo;
  contact: ContactInfo;
  totalProjects: number;
  tickerKeywords?: string[];
  designPillars?: DesignPillar[];
  projects: ProjectItem[];
}

