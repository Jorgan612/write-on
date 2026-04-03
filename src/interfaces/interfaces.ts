import { IconType } from "react-icons";

/* User Data */
export interface User {
    id: number;
    name: string;
    pronouns: string;
    bio: string;
    joined: string;
    userIcon: {
        icon: IconType;
        id: string;
        color: string;
    };
    website: {
        name: string;
        url: string;
    };
    socials: {
        id: number;
        handle: string;
        url: string;
    }[];
}

export interface UserIcon {
    icon: IconType;
    id: string;
    color?: string;
}

export interface UserSelection {
    icon: IconType;
    id: string;
    color: string;
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