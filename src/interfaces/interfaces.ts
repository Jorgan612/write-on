import { IconType } from "react-icons";

/* Warmup Prompts */
export interface Prompt {
    id: number;
    prompt: string;
    completed: number;
    discarded: number;
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




// not sure if this export default is needed. VERIFY
// export default Entry;