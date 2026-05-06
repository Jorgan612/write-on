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
