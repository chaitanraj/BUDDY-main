import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/navbar'
import Card from './components/Card.jsx'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Map from './components/Map'
import Footer from './components/Footer'
import Home from './Home/home'
import Signup from './Signup/signup.jsx'
import Loginresult from './Loginresult/Loginresult.jsx';
import SearchResult from './Searchresult.jsx/searchresult.jsx'


export const mystyle = (imageurl) => ({
  width: "100vw",
  height: "auto", 
  minHeight: "100vh", 
  backgroundImage: `url(${imageurl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  overflowX: "hidden", 
  position: "relative",
});


const router = createBrowserRouter([
  {//home
    path: "/",
    element: <> <div className="bodyimage" style={mystyle("masterbck.jpg")} >
      <Navbar /> <Home />
      {/* <Footer /> */}
    </div> </>
  },

  {//login page
    path: "/login",
    element: <>
      <div className="body" style={mystyle("masterbck.jpg")} >
        <Navbar />
        <Card />
        {/* <Footer /> */}
      </div>
    </>

  },
  {//signup page
    path: "/signup",
    element: <>
      <div className="body" style={mystyle("masterbck.jpg")} >
        <Navbar />
        <Signup />
        {/* <Footer /> */}
      </div>
    </>

  },
    {//login result page
      path: "/result",
      element: <>
        <div className="body" style={mystyle("masterbck.jpg")} >
          <Navbar />
          <Loginresult/>
          {/* <Footer /> */}
        </div>
      </>
  
    },
    {
      path: "/searchresult",
      element: <>
        <div className="body" style={mystyle("result11.jpg")}>
          <Navbar />
          <SearchResult />
          {/* <Footer /> */}
        </div>
      </>
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
)
