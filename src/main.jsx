import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar.jsx'
import Card from './components/Card.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Home from './Home/Home.jsx'
import Signup from './Signup/Signup.jsx'
import Loginresult from './Loginresult/Loginresult.jsx'
import SearchResult from './Searchresult/SearchResult.jsx'
import About from './About/About.jsx'
import Feedback from './Feedback/Feedback.jsx'
import { useState, useEffect } from 'react'
import Inbox from './Inbox/Inbox.jsx';
import { Authprovider } from './context/Authcontext.jsx'
import YourRides from './YourRides/YourRides.jsx'


export const mystyle = (imageurl) => ({
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  backgroundImage: `url(/${imageurl})`,
  backgroundSize: "cover",
  backgroundPosition: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  overflowX: "hidden",
  overflowY: "auto",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const BackgroundWrapper = ({ children, bgImage }) => {
  const [currentBg, setCurrentBg] = useState(bgImage || 'masterbck.jpg');

  useEffect(() => {
    const updateBg = () => {
      const width = window.innerWidth;
      if (bgImage === 'masterbck.jpg') {
        if (width <= 750) setCurrentBg('masterbck2.jpg');
        else setCurrentBg('masterbck.jpg');
      } else {
        setCurrentBg(bgImage);
      }
    };

    updateBg();
    window.addEventListener('resize', updateBg);
    return () => window.removeEventListener('resize', updateBg);
  }, [bgImage]);

  return (
    <div className="body" style={mystyle(currentBg)}>
      {children}
    </div>
  );
};

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Home />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/login",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Card />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/signup",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Signup />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/result",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Loginresult />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/searchresult",
    element: (
      <BackgroundWrapper bgImage="result11.jpg">
        <Navbar />
        <SearchResult />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/about",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <About />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/feedback",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Feedback />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/inbox",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Inbox/>
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/chat",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <Inbox />
        <Footer />
      </BackgroundWrapper>
    )
  },
  {
    path: "/yourRides",
    element: (
      <BackgroundWrapper bgImage="masterbck.jpg">
        <Navbar />
        <YourRides/>
        <Footer />
       </BackgroundWrapper>
    )
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <App />
    </Authprovider>
  </StrictMode>
);

export default App;