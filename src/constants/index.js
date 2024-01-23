import { ENUMs } from "@/lib/enum";
import { QUERY_KEYs } from "@/lib/react-query/types";

export const adminLinks = [
  {
    link: "home",
    text: "home",
  },
  {
    link: "blogs",
    text: "blogs",
  },
  {
    link: "projects",
    text: "projects",
  },
  {
    link: "skills",
    text: "skills",
  },
  {
    link: "certificates",
    text: "certificates",
  },
  {
    link: "works",
    text: "works",
  },
  {
    link: "users",
    text: "users",
  },
  {
    link: "subscribers",
    text: "subscribers",
  },
  {
    link: "configs",
    text: "configs",
  },
];
export const homeLinks = [
  {
    to: "home",
    text: "home",
  },
  {
    to: "blogs",
    text: "blogs",
  },
  {
    to: "about",
    text: "about",
  },
  {
    to: "services",
    text: "services",
  },
  {
    to: "skills",
    text: "skills",
  },
  {
    to: "projects",
    text: "projects",
  },
  {
    to: "certificates",
    text: "certificate",
  },
  {
    to: "works",
    text: "works",
  },
  {
    to: "contact",
    text: "contact",
  },
];
export const configParts = [
  {
    text: "Categories",
    type: ENUMs.CATEGORY,
    qKey: QUERY_KEYs.CATEGORIES,
  },
  {
    text: "Stacks",
    type: ENUMs.STACK,
    qKey: QUERY_KEYs.STACKS,
  },
  {
    text: "Types",
    type: ENUMs.TYPE,
    qKey: QUERY_KEYs.TYPES,
  },
];
export const services = [
  {
    text: "Mobile application development",
    color: "bg-primary-500",
  },
  {
    text: "UI/UX Design",
    color: "bg-green-500",
  },
  {
    text: "Web application development",
    color: "bg-orange-500",
  },
  {
    text: "API development",
    color: "bg-pink-500",
  },
];
