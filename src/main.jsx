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
import Loginresult from './Loginresult/Loginresult.jsx'


export const mystyle = (imageurl) => ({
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${imageurl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});


const router = createBrowserRouter([
  {//home
    path: "/",
    element: <> <div className="bodyimage" style={mystyle("trafficblack2.jpg")} >
      <Navbar /> <Home />
      <Footer />
    </div> </>
  },

  {//login page
    path: "/login",
    element: <>
      <div className="body" style={mystyle("bckgrnd2.jpg")} >
        <Navbar />
        <Card />
        <Footer />
      </div>
    </>

  },
  {//signup page
    path: "/signup",
    element: <>
      <div className="body" style={mystyle("trafficlate.jpg")} >
        <Navbar />
        <Signup />
        <Footer />
      </div>
    </>

  },
    {//login result page
      path: "/about",
      element: <>
        <div className="body" style={mystyle("street1.jpg")} >
          <Navbar />
          <Loginresult/>
          <Footer />
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
