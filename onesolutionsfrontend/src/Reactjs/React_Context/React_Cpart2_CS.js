import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Cpart2_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className="intro-container">
  <h1>React Context | Part 2 | Cheat Sheet</h1>

  <section>
    <h2>1. Provider</h2>
    <p>Provider Component updates the value of Context.</p>
    <p>
      When the provider updates context, all the nested consumers of that
      provider will be re-rendered.
    </p>
    <p>
      Updated context value can only be accessed by the consumers nested within
      the provider.
    </p>

    <p><b>Syntax:</b></p>
    <CodeBlock
      language="jsx"
      code={`<ContextObject.Provider value={/* some value */}>
  ...
</ContextObject.Provider>`}
    />

    <p>
      To update context value, we have to pass it as a prop to the Provider
      component.
    </p>
  </section>

  <section>
    <h2>2. Context Flow For Windows App</h2>
    <img
          src="/assets/img/context-part-2.png"
          alt="project"
          style={{ width: "90%", height: "300px" }}
        />
  </section>

  <section>
    <h2>3. Best Practice</h2>
    <ul>
      <li>The context value should have the data which the consumers need.</li>
      <li>It should also contain the required methods to update that data.</li>
    </ul>
  </section>

  <section>
    <h2>4. Final Code</h2>

    <h3>File: src/App.js</h3>
    <CodeBlock
      language="jsx"
      code={`import {Component} from 'react'

      import Header from './components/Header'
      import LandingSection from './components/LandingSection'
      import FeaturesSection from './components/FeaturesSection'
      
      import LanguageContext from './context/LanguageContext'
      
      import './App.css'
      
      class App extends Component {
        state = {activeLanguage: 'EN'}
      
        changeLanguage = activeLanguage => {
          this.setState({activeLanguage})
        }
      
        render() {
          const {activeLanguage} = this.state
          return (
            <LanguageContext.Provider
              value={{activeLanguage, changeLanguage: this.changeLanguage}}
            >
              <Header />
              <LandingSection />
              <FeaturesSection />
            </LanguageContext.Provider>
          )
        }
      }
      
      export default App`}
    />

    <h3>File: src/context/LanguageContext.jsx</h3>
    <CodeBlock
      language="jsx"
      code={`import React from 'react'

const LanguageContext = React.createContext({
  activeLanguage: 'EN',
  changeLanguage: () => {},
})

export default LanguageContext`}
    />

    <h3>File: src/components/FeaturesSection/index.js</h3>
    <CodeBlock
      language="jsx"
      code={`import Playtime from '../Playtime'
      import NewWaysToConnect from '../NewWaysToConnect'
      
      import './index.css'
      
      const FeaturesSection = () => (
        <div className="features-section-container">
          <Playtime />
          <NewWaysToConnect />
        </div>
      )
      
      export default FeaturesSection`}
    />

    <h3>File: src/components/Header/index.js</h3>
    <CodeBlock
      language="jsx"
      code={`import LanguageContext from '../../context/LanguageContext'

      import './index.css'
      
      const langOptions = [
        {id: 1, value: 'EN', language: 'English'},
        {id: 2, value: 'HI', language: 'हिंदी'},
        {id: 3, value: 'TE', language: 'తెలుగు'},
      ]
      
      const Header = () => (
        <LanguageContext.Consumer>
          {value => {
            const {activeLanguage, changeLanguage} = value
            const onChangeLanguage = event => {
              changeLanguage(event.target.value)
            }
      
            return (
              <nav className="nav-header">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/windows-logo-img.png"
                  alt="website logo"
                />
                <select
                  className="language-dropdown"
                  value={activeLanguage}
                  onChange={onChangeLanguage}
                >
                  {langOptions.map(eachOption => (
                    <option key={eachOption.id} value={eachOption.value}>
                      {eachOption.language}
                    </option>
                  ))}
                </select>
              </nav>
            )
          }}
        </LanguageContext.Consumer>
      )
      
      export default Header`}
    />

    <h3>File: src/components/LandingSection/index.js</h3>
    <CodeBlock
      language="jsx"
      code={`import LanguageContext from '../../context/LanguageContext'

      import './index.css'
      
      const landingSectionContent = {
        EN: {
          heading: 'Windows 11',
          description:
            'Windows 11 provides a calm and creative space where you can pursue your passions through a fresh experience. From a rejuvenated Start menu to new ways to connect to your favorite people, news, games, and content. Windows  is the place to think, express, and create in a natural way.',
        },
        HI: {
          heading: 'विंडोज 11',
          description:
            'विंडोज 11 एक शांत और रचनात्मक स्थान प्रदान करता है जहां आप एक नए अनुभव के माध्यम से अपने जुनून को आगे बढ़ा सकते हैं। अपने पसंदीदा लोगों, समाचारों, गेमों और सामग्री से जुड़ने के नए तरीकों से एक नए सिरे से शुरू किए गए स्टार्ट मेनू से विंडोज एक प्राकृतिक तरीके से सोचने, व्यक्त करने और बनाने का स्थान है।',
        },
        TE: {
          heading: 'విండోస్ 11',
          description:
            'విండోస్ 11 ప్రశాంతమైన మరియు సృజనాత్మక స్థలాన్ని అందిస్తుంది, ఇక్కడ మీరు మీ అభిరుచులను తాజా అనుభవం ద్వారా కొనసాగించవచ్చు. పునరుజ్జీవింపబడిన ప్రారంభ మెను నుండి మీకు ఇష్టమైన వ్యక్తులు, వార్తలు, ఆటలు మరియు కంటెంట్‌తో కనెక్ట్ అవ్వడానికి కొత్త మార్గాల వరకు విండోస్ అనేది సహజంగా ఆలోచించే, వ్యక్తీకరించే మరియు సృష్టించే ప్రదేశం.',
        },
      }
      
      const LandingSection = () => {
        const getLandingSectionData = activeLanguage => {
          switch (activeLanguage) {
            case 'EN':
              return landingSectionContent.EN
            case 'HI':
              return landingSectionContent.HI
            case 'TE':
              return landingSectionContent.TE
            default:
              return null
          }
        }
        return (
          <LanguageContext.Consumer>
            {value => {
              const {activeLanguage} = value
              const {heading, description} = getLandingSectionData(activeLanguage)
              return (
                <div className="bg-container">
                  <div className="responsive-container">
                    <div className="description-container">
                      <h1 className="heading">{heading}</h1>
                      <p className="description">{description}</p>
                    </div>
                    <img
                      className="logo-white"
                      src="https://assets.ccbp.in/frontend/react-js/windows-logo-white-img.png"
                      alt="windows logo"
                    />
                  </div>
                </div>
              )
            }}
          </LanguageContext.Consumer>
        )
      }
      
      export default LandingSection`}
    />

    <h3>File: src/components/NewWaysToConnect/index.js</h3>
    <CodeBlock
      language="jsx"
      code={`import LanguageContext from '../../context/LanguageContext'

      import './index.css'
      
      const newWaysToConnectContent = {
        EN: {
          heading: 'New ways to connect',
          description:
            'Connect instantly to the people you care about right from your desktop with Microsoft Teams. Call or chat for free, no matter what device they’re on.',
        },
        HI: {
          heading: 'कनेक्ट करने के नए तरीके',
          description:
            'माइक्रोसॉफ्ट टीमों के साथ सीधे अपने डेस्कटॉप से ​​उन लोगों से तुरंत कनेक्ट हों जिनकी आप परवाह करते हैं। कॉल करें या निःशुल्क चैट करें—चाहे वे किसी भी डिवाइस पर हों।',
        },
        TE: {
          heading: 'కనెక్ట్ చేయడానికి కొత్త మార్గాలు',
          description:
            'మైక్రోసాఫ్ట్ బృందాలతో మీ డెస్క్‌టాప్ నుండి మీరు శ్రద్ధ వహించే వ్యక్తులతో తక్షణమే కనెక్ట్ అవ్వండి. అవి ఏ పరికరంలో ఉన్నా సరే ఉచితంగా కాల్ చేయండి లేదా చాట్ చేయండి',
        },
      }
      
      const NewWaysToConnect = () => {
        const getNewWaysToConnectData = activeLanguage => {
          switch (activeLanguage) {
            case 'EN':
              return newWaysToConnectContent.EN
            case 'HI':
              return newWaysToConnectContent.HI
            case 'TE':
              return newWaysToConnectContent.TE
            default:
              return null
          }
        }
        return (
          <LanguageContext.Consumer>
            {value => {
              const {activeLanguage} = value
              const {heading, description} = getNewWaysToConnectData(activeLanguage)
              return (
                <div className="new-ways-to-connect-container">
                  <h1 className="new-ways-to-content-heading">{heading}</h1>
                  <p className="new-ways-to-content-description">{description}</p>
                </div>
              )
            }}
          </LanguageContext.Consumer>
        )
      }
      
      export default NewWaysToConnect`}
    />

    <h3>File: src/components/Playtime/index.js</h3>
    <CodeBlock
      language="jsx"
      code={`import LanguageContext from '../../context/LanguageContext'

      import './index.css'
      
      const playtimeContent = {
        EN: {
          heading: 'Playtime. Anytime',
          description:
            'Windows takes gaming to a whole new level with graphic capabilities that rival reality. Discover your next favorite game with Xbox GamePass, giving you access to over 100 high-quality games.',
        },
        HI: {
          heading: 'विश्राम का समय। किसी भी समय',
          description:
            'विंडोज़ गेमिंग को ग्राफ़िक क्षमताओं के साथ एक नए स्तर पर ले जाता है जो वास्तविकता को टक्कर देता है। एक्सबॉक्स गेम पास के साथ अपना अगला पसंदीदा गेम खोजें, जिससे आपको 100 से अधिक उच्च-गुणवत्ता वाले गेम तक पहुंच मिलती है।',
        },
        TE: {
          heading: 'ఆడూకునే సమయం. ఎప్పుడైనా',
          description:
            'రియాలిటీకి ప్రత్యర్థిగా ఉండే గ్రాఫిక్ సామర్థ్యాలతో విండోస్ గేమింగ్‌ను సరికొత్త స్థాయికి తీసుకువెళుతుంది . మీ తదుపరి ఇష్టమైన ఆటను ఎక్స్‌బాక్స్ గేమ్‌పాస్‌తో కనుగొనండి, మీకు 100 కి పైగా అధిక-నాణ్యత ఆటలకు ప్రాప్యతను ఇస్తుంది.',
        },
      }
      
      const Playtime = () => {
        const getPlaytimeData = activeLanguage => {
          switch (activeLanguage) {
            case 'EN':
              return playtimeContent.EN
            case 'HI':
              return playtimeContent.HI
            case 'TE':
              return playtimeContent.TE
            default:
              return null
          }
        }
        return (
          <LanguageContext.Consumer>
            {value => {
              const {activeLanguage} = value
              const {heading, description} = getPlaytimeData(activeLanguage)
              return (
                <div className="playtime-container">
                  <h1 className="playtime-heading">{heading}</h1>
                  <div className="playtime-description-container">
                    <p className="playtime-description">{description}</p>
                    <img
                      className="playtime-games-image"
                      src="https://assets.ccbp.in/frontend/react-js/gaming-pad-img.png"
                      alt="gaming pad"
                    />
                  </div>
                </div>
              )
            }}
          </LanguageContext.Consumer>
        )
      }
      
      export default Playtime`}
    />
  </section>
  
   
      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
              ? "✓ Completed"
              : "Continue"}
         </button>
       </div>
     </div>
  );
};

export default React_Cpart2_CS;
