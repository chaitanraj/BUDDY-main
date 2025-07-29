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
import Chat from './Chat/Chat.jsx';
import Inbox from './Inbox/Inbox.jsx';
// import Chat from './Chat/Chat.jsx'

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
 useEffect(() => {
      // fetch(`${import.meta.env.VITE_API_URL}/verify-user`,{
        fetch("http://localhost:5000/verify-user", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok)
                    throw new Error("Not authenticated")
                return res.json();
            })
            .then((data) => {
                setIsAuthenticated(true);
                setUser(data.name);
                console.log("Successfull Login")
            })
    }, []);

export const mystyle = (imageurl) => ({
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  backgroundImage: `url(/${imageurl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  overflowX: "hidden",
  overflowY: "auto",
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
        <Inbox currentUser={user}/>
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
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default App;