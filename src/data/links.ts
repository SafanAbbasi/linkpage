export interface LinkItem {
  id: string;
  label: string;
  url: string;
  bgColor: string;
  hoverColor: string;
  icon?: string;
  description?: string;
}

export const links: LinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/SafanAbbasi",
    bgColor: "#2C2C2A",
    hoverColor: "#444441",
    icon: "Code",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/in/safanabbasi",
    bgColor: "#185FA5",
    hoverColor: "#0C447C",
    icon: "Briefcase",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    url: "https://safanabbasi.github.io",
    bgColor: "#534AB7",
    hoverColor: "#3C3489",
    icon: "Globe",
  },
  {
    id: "resume",
    label: "Resume / CV",
    url: "/resume.pdf",
    bgColor: "#0F6E56",
    hoverColor: "#085041",
    icon: "FileText",
  },
];

export const profile = {
  name: "Safan Abbasi",
  greeting: "Hey, I'm Safan!",
  title: "Software Engineer & NASA Patent Co-Inventor",
  skills: ["Full-Stack Engineering", "AI & LLM Systems", "Cloud Architecture"],
  bio: "I build innovative solutions for complex technical challenges, with a focus on scalable and impactful results!",
  avatarUrl: "/avatar.jpeg",
};
