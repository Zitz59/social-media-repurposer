import {ReactNode} from "react";

export type Tab = "Summary" | "LinkedIn Post" | "Twitter Post"

export type TabItem = {
    title: Tab,
    content: string,
    icon:ReactNode,
}