import { IconType } from "react-icons";

export type UsersList = User[];
export type Excerpts = Excerpt[];


    /* User Data */
export interface User {
    id: number;
    isVerified: boolean;
    name: string;
    username: string;
    email: string;
    password: string;
    pronouns: string;
    bio: string;
    joined: string;
    groups: {
        groupId: string;
    }[];
    userIcon: {
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
    goals: {
        name: string;
        id: string;
        total: number;
        current: number;
        type: string;
    }[];
    entries: {
        date: string;
        day: number;
        id: number;
        month: number;
        time: string;
        total: number;
        year: number;
    }[];
    milestones: {
        id: number;
        userIcon: UserIcon;
        name: string;
        description: string;
        milestone: number;
    }[]
    achievements: {
        id: number;
        userIcon: UserIcon;
        name: string;
        description: string;
        condition: string | number;
    }[]
}

export interface UserProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  combinedEntries:  Record<string, number>;
}

export interface UserIcon {
    icon?: IconType;
    id: string;
    color?: string;
}

export interface UserSelection {
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

/* Goals */
export interface Goal {
        name: string;
        id: string;
        value: number;
        current: number
        type: string
}

/* Group */
export interface GroupProps {
    groupId: string;
    name: string;
    ownerID: number;
    creationDate: string;
    meetings: string[];
    invites: string[];
    members: number[];
}

export interface GroupData {
    groupId: string;
    groupName: string;
    members: User[];
}

export interface Excerpt {
    id: number;
    groupId: string;
    meetingDate: string;
    userID: number;
    username: string;
    userIcon: {
        id: string;
        color: string;
    };
    links: Link[];
    description: string;
    createdAt: string;
}

export interface Link {
    id: string;
    linkName: string;
    linkURL: string;
}

export interface MembersProps {
    currentUser: User;
    members: UsersList | null;
    selectedMember: User | null;
    setSelectedMember: React.Dispatch<React.SetStateAction<User | null>>;
}