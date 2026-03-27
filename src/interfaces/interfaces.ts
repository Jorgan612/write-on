import { IconType } from "react-icons";

/* User Data */
export interface User {
    id: number;
    name: string;
    pronouns: string;
    bio: string;
    joined: string;
    website: {
        name: string;
        url: string;
    };
    socials: {
        name: string;
        url: string;
    };
}

/* Warmup Prompts */
export interface Prompt {
    id: number;
    prompt: string;
    completed: number;
    discarded: number;
    excerpt: string;
}

export interface Icon {
    icon: IconType;
    id: string;
    toolTip: string;
}


/* Word Count */
export interface Entry {
    id: number;
    total: number;
    date: string;
    year: number;
    month: number;
    day: number;
    time: string;
}


export interface CombinedEntry {
    id: number;
    dailyTotal: number;
    date: string;
    year: number;
    month: number;
    day: number;
    time: string;
}