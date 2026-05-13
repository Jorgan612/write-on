// removed dummy data. Keeping file for now. Will delete later.
import { UsersList, User } from '../interfaces/interfaces';

export const user: User = {
    id: 612,
    name: 'Jessica',
    username: 'Jesso',
    email: 'Jorgan612@gmail.com',
    password: '123456',
    pronouns: 'She/Her',
    bio: 'bookworm | game enthusiast | perpetually curious',
    joined: 'January 1st, 2026',
    userIcon: {id: 'coffee', color: '#9dd6ff'},
    website: {
        name: 'jessoportfolio',
        url: 'https://jess-o-portfolio.vercel.app/',
    },
    socials: [{
        id: 1,
        handle: 'jessowrites.bsky.social',
        url: 'https://bsky.app/profile/jessowrites.bsky.social'
    },
    {
        id: 2,
        handle: 'jess.o.writes',
        url: 'https://instagram.com'
    }],
    goals: [{
        name: 'Weekly Word Count',
        id: '1',
        total: 3000,
        current: 0,
        type: 'word(s)'
      },
      {
        name: 'Weekly Session Frequency ',
        id: '2',
        total: 4,
        current: 0,
        type: 'day(s)'
      },
      {
        name: 'Overall Word Count',
        id: '3',
        total: 90000,
        current: 0,
        type: 'word(s)'
      }],
    entries: [],
};

export const user1: User = {
        id: 612,
        name: 'Jessica',
        username: 'Jesso',
        email: 'Jorgan612@gmail.com',
        password: '123456',
        pronouns: 'She/Her',
        bio: 'bookworm | game enthusiast | perpetually curious',
        joined: 'January 1st, 2026',
        userIcon: {id: 'coffee', color: '#9dd6ff'},
        website: {
            name: 'jessoportfolio',
            url: 'https://jess-o-portfolio.vercel.app/',
        },
        socials: [{
            id: 1,
            handle: 'jessowrites.bsky.social',
            url: 'https://bsky.app/profile/jessowrites.bsky.social'
        },
        {
            id: 2,
            handle: 'jess.o.writes',
            url: 'https://instagram.com'
        }],
        goals: [{
            name: 'Weekly Word Count',
            id: '1',
            total: 3000,
            current: 0,
            type: 'word(s)'
        },
        {
            name: 'Weekly Session Frequency ',
            id: '2',
            total: 4,
            current: 0,
            type: 'day(s)'
        },
        {
            name: 'Overall Word Count',
            id: '3',
            total: 90000,
            current: 0,
            type: 'word(s)'
        }],
        entries: [],
    }

    export const user2:User = {
        id: 311,
        name: 'Max',
        username: 'MaxExplores',
        email: 'mhenrey091@gmail.com',
        password: '654321',
        pronouns: 'He/Him',
        bio: 'I LIKE SPAAAAAAAACE!',
        joined: 'April 27th, 2026',
        userIcon: {id: 'moon', color: '#74c3b0'},
        website: {
            name: 'MaxExploresLife',
            url: 'https://jess-o-portfolio.vercel.app/',
        },
        socials: [{
            id: 1,
            handle: 'maxexplores',
            url: 'https://instagram.com'
        },
        {
            id: 2,
            handle: 'maxexplorestactical',
            url: 'https://instagram.com'
        }],
        goals: [{
            name: 'Weekly Word Count',
            id: '1',
            total: 500,
            current: 0,
            type: 'word(s)'
        },
        {
            name: 'Weekly Session Frequency ',
            id: '2',
            total: 1,
            current: 0,
            type: 'day(s)'
        },
        {
            name: 'Overall Word Count',
            id: '3',
            total: 50000,
            current: 0,
            type: 'word(s)'
        }],
        entries: [],
    }

    export const milestones = [
        {
            id: 1,
            iconID: 'seedling',
            name: 'The First Spark',
            description: 'Reach your first 1,000 words.',
            milestone: 1000
        },
        {
            id: 2,
            iconID: 'penFancy',
            name: 'The Novella Mark',
            description: 'Reach 20,000 words.',
            milestone: 20000
        },
        {
            id: 3,
            iconID: 'hippo',
            name: 'The Hump',
            description: 'Reach 40,000 words.',
            milestone: 40000
        },
        {
            id: 4,
            iconID: 'meteor',
            name: 'The Marathoner',
            description: 'Reach 80,000 words.',
            milestone: 80000
        },
        {
            id: 5,
            iconID: 'paperPlane',
            name: 'The Tome',
            description: 'Reach 100,000 words.',
            milestone: 100000
        },
        {
            id: 6,
            iconID: 'bomb',
            name: 'Quarter-Way There',
            description: 'Reach 25% of your overall word count goal.',
            milestone: 25
        },
        {
            id: 7,
            iconID: 'bicycle',
            name: 'The Final Stretch',
            description: 'Almost there! You\'ve reached 90% of your overall word count goal.',
            milestone: 90
        },
        {
            id: 8,
            iconID: 'bolt',
            name: 'Mission Accomplished',
            description: 'Congratulations, you\'ve reached your overall word count goal.',
            milestone: 100
        },
    ];

    export const achievements = [
        {
            id: 1,
            iconID: 'kiwi',
            name: 'Early Bird',
            description: 'Log a writing session before 7:00 AM.',
            condition: '07:00'
        },
        {
            id: 2,
            iconID: 'moon',
            name: 'Night Owl',
            description: 'Log a writing session after midnight.',
            condition: '00:00'
        },
        {
            id: 3,
            iconID: 'hotJar',
            name: 'The Streak',
            description: 'Write for 5 days in a row.',
            condition: 5
        },
        {
            id: 4,
            iconID: 'coffee',
            name: 'The Habit Maker',
            description: 'Write every day for 30 days.',
            condition: 30
        },
        {
            id: 5,
            iconID: 'feather',
            name: 'Unstoppable',
            description: 'Write more than 2,000 words in a single sitting.',
            condition: 30
        },
        {
            id: 6,
            iconID: 'leaf',
            name: 'Plot Hole Filler',
            description: 'Complete a session after a hiatus of more than a week.',
            condition: 10
        },
        {
            id: 7,
            iconID: 'tunesNote',
            name: 'The Muse is Calling',
            description: 'Write on a weekend.',
            condition: 6 | 0
        },
        {
            id: 8,
            iconID: 'wizardHat',
            name: 'Weekly Word Count Wizard',
            description: 'You\'ve met your weekly word count goal!',
            condition: null
        },
        {
            id: 9,
            iconID: 'hiking',
            name: 'Frequent  ',
            description: 'You\'ve met your weekly word count goal!',
            condition: null
        },
    ];
