import './LandingPage.scss';
import { FaEnvelope, FaPenFancy } from 'react-icons/fa';
import calendarImg from '../assets/images/calendar.png';
import goalsImg from '../assets/images/goals.png';
import wordtrackerImg from '../assets/images/wordtracker.png';
import stasImg from '../assets/images/stats.png';


function LandingPage() {

    return (
        <div className="landing-page-container">
            <h1>Write On <FaPenFancy /></h1>
            <div className='top-section'>
                <section className='welcome-section'>
                    <h2>Welcome, writers!</h2> 
                    <p>[Write On catchy Phrase here!]</p>
                </section>
                <section className='login-signup-section'>
                    <h3>
                        Don't have an account? 
                    </h3>
                    <button className='sign-up-button'>Sign Up</button>
                    <span>or</span>
                    <span className='login-link'>Login</span>

                </section>
            </div>
            <p className='write-on-quote'>Whether you're a new writer or a published author, Write On is designed to help you make progress with your manuscript.</p>
            <section className='feature-preview-section'>
                <section className='feature'>
                    <div className='item highlight'>
                        <p>
                            The built in calendar provides a pleasant visual display of your writing productivity.
                        </p>
                        <p>
                            The days highlighted in blue indicate days with logged words.
                        </p>
                        <p>
                            The brigher the color, the more words were logged.
                        </p>
                    </div>
                    <div className='item img'>
                        <img src={calendarImg} alt='image of a calendar' />
                    </div>
                </section>
                <section className='feature'>
                    {/* goals */}
                    <div className='item'>
                        <img src={wordtrackerImg} />
                    </div>
                    <div className='item highlight'></div>
                </section>

                <section className='feature-long'>
                    <div className='item'>
                        <img src={goalsImg} />
                    </div>
                    <div className='highlight'>
                        <p>Goals can be set on your personal dashboard and are intended to help you remain accountable on your writing journey.</p>
                        <p>Remember! These are just tools to assist you and we recommend setting sustainable goals to see you through your writing journey.</p>
                    </div>
                </section>

{/* need to keep working on styling, left off here. fix so that there is more consistency with long feature containers if possible */}
                <section className='feature-long'>
                    <div className='item'>
                        <img src={stasImg} />
                    </div>
                    <div className='highlight'></div>
                    {/* Stats */}
                </section>
                <section className='feature'>
                    <div className='item'></div>
                    <div className='item highlight'></div>
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