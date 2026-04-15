import './LandingPage.scss';
import { FaEnvelope, FaPenFancy, FaArrowAltCircleDown } from 'react-icons/fa';
import calendarImg from '../assets/images/calendar.png';
import calendarWCUpdate from '../assets/images/WCUpdate.png';
import goalsImg from '../assets/images/goals.png';
import wordtrackerImg from '../assets/images/wordtracker.png';
import stasImg from '../assets/images/stats.png';
import warmupImg from '../assets/images/warmup.png';
import trackerTwo from '../assets/images/trackerTwo.png';


function LandingPage() {

    return (
        <div className="landing-page-container">
            <h1>Write On  <FaPenFancy /></h1>
            <div className='top-section'>
                <section className='welcome-section'>
                    <div>
                        <p>Visualize your progress.</p>
                        <p>Build your habit.</p>
                        <p>Finish your book.</p>
                    </div>
                </section>
            </div>

            <p className='write-on-quote'>Built for every writer and every story, Write On empowers writers at every stage to track, visualize, and complete their manuscripts, one word at a time.</p>
            <section className='login-signup-section'>
                <p>
                    Don't have an account? 
                </p>
                <div>
                    <button className='sign-up-button'>Sign Up</button>
                    <span>or</span>
                    <span className='login-link'>Login</span>
                </div>

            </section>
            <div className='divider'>
                <FaArrowAltCircleDown className='icon' />
            </div>

            <section className='feature-preview-section'>
                <h1>Features</h1>
                <section className='feature-multi'>
                    <h2>Calendar</h2>
                    <div className='item img'>
                        <img src={calendarImg} alt='image of a calendar' />
                        <img src={calendarWCUpdate} alt='image of a calendar update feature' />
                    </div>
                    <div className='highlight'>
                        <p>
                            Monitor your output with the color-coded productivity calendar. Peak writing days shine brighter, giving you an instant view of your writing habits.
                            <br/>
                            Forgot to log a day? Modify a past date by simply clicking the date on the calendar and entering a new word count total.
                        </p>

                    </div>
                </section>
                <section className='feature-multi'>
                    <h2>Word Count Tracker</h2>
                    <div className='item img'>
                        <img src={wordtrackerImg} alt='word tracker image one'/>
                        <img src={trackerTwo} alt='word tracker image two' />
                    </div>
                    <div className='highlight'>
                        <p>
                           Effortlessly log your progress throughout the day. Whether you write in sprints or steady sessions, every word counts toward your goal.
                        </p>
                    </div>
                </section>

                <section className='feature-long'>
                    <h2>Goals</h2>
                    <div className='item'>
                        <img src={goalsImg} />
                    </div>
                    <div className='highlight'>
                        <p>
                            Take control of your journey by setting personal writing goals. Write On is designed to assist, not pressure; we encourage setting manageable targets that keep you inspired and writing day after day.
                            However, your goals are a guide, not a ceiling; you can always log more than your set target whenever the inspiration strikes.
                        </p>
                    </div>
                </section>

                    {/* need to keep working on styling, left off here. fix so that there is more consistency with long feature containers if possible */}
                <section className='feature-long'>
                    <h2>Stats</h2>
                    <div className='item'>
                        <img src={stasImg} />
                    </div>
                    <div className='highlight'>
                        <p>
                            Gain insights into your writing habits with our Stats page. Track your progress across 7-day, 30-day, and year-long overviews designed to show you the big picture. Beyond the charts, features like <strong>Daily Average</strong> and <strong>Sustainable Word Count</strong> help you maintain a healthy consistency, reducing the risk of burnout. Celebrate your wins with highlights for your <strong>Best Writing Day</strong>, <strong>Total Days Written</strong>, and your <strong>Longest Streak</strong>.
                        </p>
                    </div>
                    {/* Stats */}
                </section>
                <section className='feature-long'>
                    <h2>Warm-up Page</h2>
                    <div className='item'>
                        <img src={warmupImg} />
                    </div>
                    <div className='highlight'>
                        <p>
                            The warm-up page is designed to get your words flowing. Use it for unstructured freewriting or tap into your personal prompt list. You can select a specific prompt or reveal a random prompt to beat writer's block. Completed responses can be saved along with the selected prompt for future review, while prompts that no longer resonate can be moved to a discard list or permanently deleted. The warm-up page is your personalized toolkit for daily creative maintenance.
                        </p>
                    </div>
                    {/* Warmup */}
                </section>
            </section>


            <section className='frequently-asked-questions-section'>
                <h2>
                    Frequently asked questons
                </h2>
                <section className='q-and-a'>
                    <h3 className='question'>Is Write On free to use?</h3>
                    <p className='answer'>At this time, yes! The personal dashboard, stats and warmup pages will remain free to use for all registered users. As the app grows more personalized features, such as the writing group dashboard, may not be.</p>
                    <h3 className='question'>Does Write On have a mobile app?</h3>
                    <p className='answer'>There is no mobile app for Write On. It is only a web-based application.</p>
                    <h3 className='question'>What is the story behind Write On?</h3>
                    <p className='answer'>Write On started as a passion project by Jessica Organ to help track writing progress while working on her debut novel. It quickly turned into a much larger dream of helping other writers make progress on their manuscripts and to be able to more easily share excerpts with their fellow writers.</p>
                </section>
                <h4>
                    Can't find the answer you're looking for? 
                    <a href='mailto:Jorgan612@gmail.com' target='_blank' rel='noopener noreferrer'>
                        <FaEnvelope className='icon' />
                        <span>
                            Contact us
                        </span>
                    </a>!
                </h4>
            </section>
            <section className='developer-blurb-section'></section>
            <footer>
                <a>Privacy</a>
                <a>Terms</a>
                <div>[© copywrite placeholder]</div>

            </footer>
      </div>
    )
}

export default LandingPage;