// removed dummy data. Keeping file for now. Will delete later.
import { UsersList, User } from '../interfaces/interfaces';

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
        milestones: [
            {
                id: 1,
                userIcon: {id: 'seedling', color: '#aec78d'},
                name: 'The First Spark',
                description: 'Reach your first 1,000 words.',
                milestone: 1000
            }
        ],
        achievements: []
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
        milestones: [],
        achievements: []
    }

    // export const milestones = [];

    // export const milestones = [
    //     {
    //         id: 1,
    //         userIcon: {id: 'seedling', color: '#aec78d'},
    //         name: 'The First Spark',
    //         description: 'Reach your first 1,000 words.',
    //         milestone: 1000
    //     },
    //     {
    //         id: 2,
    //         userIcon: {id: 'penFancy', color: '#f5f5f5'},
    //         name: 'The Novella Mark',
    //         description: 'Reach 20,000 words.',
    //         milestone: 20000
    //     },
    //     {
    //         id: 3,
    //         userIcon: {id:'hippo', color: '#74c3b0'},
    //         name: 'The Hump',
    //         description: 'Reach 40,000 words.',
    //         milestone: 40000
    //     },
    //     {
    //         id: 4,
    //         userIcon: {id:'meteor', color: '#f18581'},
    //         name: 'The Marathoner',
    //         description: 'Reach 80,000 words.',
    //         milestone: 80000
    //     },
    //     {
    //         id: 5,
    //         userIcon: {id:'paperPlane', color:'#f5f5f5'},
    //         name: 'The Tome',
    //         description: 'Reach 100,000 words.',
    //         milestone: 100000
    //     },
    //     {
    //         id: 6,
    //         userIcon: {id:'bomb', color: '#9dd6ff'},
    //         name: 'Quarter-Way There',
    //         description: 'Reach 25% of your overall word count goal.',
    //         milestone: 25
    //     },
    //     {
    //         id: 7,
    //         userIcon: {id:'bicycle', color: '#b9e3d7'},
    //         name: 'The Final Stretch',
    //         description: 'Almost there! You\'ve reached 90% of your overall word count goal.',
    //         milestone: 90
    //     },
    //     {
    //         id: 8,
    //         userIcon: {id:'bolt', color: '#ffeaab'},
    //         name: 'Mission Accomplished',
    //         description: 'Congratulations, you\'ve reached your overall word count goal.',
    //         milestone: 100
    //     },
    // ];

    // export const achievements = [];
    // export const achievements = [
    //     {
    //         id: 1,
    //         userIcon: {id:'crow', color: '#869bd2'},
    //         name: 'Early Bird',
    //         description: 'Log a writing session before 7:00 AM.',
    //         condition: '07:00'
    //     },
    //     {
    //         id: 2,
    //         userIcon: {id:'moon', color: '#c8eafe'},
    //         name: 'Night Owl',
    //         description: 'Log a writing session after midnight.',
    //         condition: '00:00'
    //     },
    //     {
    //         id: 3,
    //         userIcon: {id:'hotJar', color: '#ffd07e'},
    //         name: 'The Streak',
    //         description: 'Write for 5 days in a row.',
    //         condition: 5
    //     },
    //     {
    //         id: 4,
    //         userIcon: {id:'coffee', color: '#9dd6ff'},
    //         name: 'The Habit Maker',
    //         description: 'Write every day for 30 days.',
    //         condition: 30
    //     },
    //     {
    //         id: 5,
    //         userIcon: {id:'feather', color: '#ffccd9'},
    //         name: 'Unstoppable',
    //         description: 'Write more than 2,000 words in a single day.',
    //         condition: 30
    //     },
    //     {
    //         id: 6,
    //         userIcon: {id:'leaf', color: '#74c3b0'},
    //         name: 'Plot Hole Filler',
    //         description: 'Complete a session after a week long hiatus.',
    //         condition: 10
    //     },
    //     {
    //         id: 7,
    //         userIcon: {id:'tunesNote', color: '#869bd2'},
    //         name: 'The Muse is Calling',
    //         description: 'Write on a weekend.',
    //         condition: 6 | 0
    //     },
    //     {
    //         id: 8,
    //         userIcon: {id:'wizardHat', color: '#7eced3'},
    //         name: 'Weekly Word Count Wizard',
    //         description: 'You\'ve met your weekly word count goal!',
    //         condition: null
    //     },
    //     {
    //         id: 9,
    //         userIcon: {id:'hiking', color: '#ffa884'},
    //         name: 'Frequent  ',
    //         description: 'You\'ve met your weekly session frequency goal!',
    //         condition: null
    //     },
    // ];
