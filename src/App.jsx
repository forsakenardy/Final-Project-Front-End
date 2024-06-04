import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Locations from './pages/Locations';
import Users from './pages/Users';
import LocationInfo from './pages/LocationInfo';
import Events from './pages/Events';
import Profile from './pages/Profile';
import SignupPage from './pages/SignupPage';
import LoginForm from './pages/LoginForm';
import ChallengeForm from './pages/ChallengeForm';
import Matches from './pages/Matches';
import AboutUs from './pages/AboutUs';
import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

function App() {


  const [locations, setLocations] = useState([])
  const [events, setEvents] = useState([])
  const [matches, setMatches] = useState([])
  const [profile, setProfile] = useState([])


const getMatch = async()=>{
  try{
    const storedToken = localStorage.getItem("authToken");
    if(!storedToken){
      throw new Error("No auth token found");
    }
    const response = await axios.get(`${API_URL}/matches/`, {headers: {Authorization: `Bearer ${storedToken}`}})
    const matches = response.data;
    console.log("matches taken", matches);
    setMatches(matches)
  }catch(error){
    console.log("There is an error creating a new match", error)
  }
}
  const getLocations = async () => {
    try {
     /* const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        throw new Error("No auth token found");
      }*/

      const response = await axios.get(`${API_URL}/locations/`) //,{ headers: { Authorization: `Bearer ${storedToken}` } });
      const locations = response.data;

      console.log("data is good", locations);

      setLocations(locations);
    } catch (error) {

      console.log("there's an error", error)
    }
  }

  const getEvents = async () => {
    try {
     /* const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        throw new Error("No auth token found");
      }*/

      const response = await axios.get(`${API_URL}/events/`) //,{ headers: { Authorization: `Bearer ${storedToken}` } });
      const events = response.data;

      console.log("data is good", events);

      setEvents(events);
    } catch (error) {

      console.log("there's an error", error)
    }
  }
  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        throw new Error("No auth token found");
      }

      const response = await axios.get(`${API_URL}/users/`,{ headers: { Authorization: `Bearer ${storedToken}` } });

      const profile = response.data;

      console.log("data is good", profile);

      setProfile(profile);
    } catch (error) {
      console.log("there's an error", error)
    }
  }

  useEffect(() => {
    getLocations();
    getEvents();
    getProfile();
    getMatch()
  }, [])


  return (
    <>
      <Navbar profile={profile}/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/locations' element={<Locations locations={locations} />} />
        <Route path='/users' element={<IsPrivate><Users profile={profile} matches={matches}/> </IsPrivate>} />
        <Route path='/locations/:locationId' element={<LocationInfo profile={profile} locations={locations} getLocations={getLocations} />} />
        <Route path='/events' element={<Events events={events} setEvents={setEvents} />} />
        <Route path='/profile/:profileId' element={<Profile  profile={profile} getProfile={getProfile}/>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/loginForm' element={<IsAnon><LoginForm /> </IsAnon> } />
        <Route path='/users/challengeform' element={<IsPrivate> <ChallengeForm matches={matches} locations={locations} getMatch={getMatch}  /> </IsPrivate>} />
        <Route path='/creatematches' element={<IsPrivate> <Matches matches={matches} locations={locations} getMatch={getMatch}/> </IsPrivate>} />

        <Route path='/aboutUs' element={<AboutUs />} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;