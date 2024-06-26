import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
import EditMatch from './pages/EditMatch';
import axios from 'axios';
import sound from './assets/images/ping-pong.mp3'
import { AuthContext } from './auth.context';
import { useContext } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { user } = useContext(AuthContext);

  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const getMatch = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        throw new Error("No auth token found");
      }
      const response = await axios.get(`${API_URL}/matches/`, { headers: { Authorization: `Bearer ${storedToken}` } });
      const matches = response.data;
      setMatches(matches);
    } catch (error) {
      // Handle error
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/locations/`);
      const locations = response.data;
      setLocations(locations);
    } catch (error) {
      // Handle error
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/`);
      const events = response.data;
      setEvents(events);
    } catch (error) {
      // Handle error
    }
  };

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        throw new Error("No auth token found");
      }
      const response = await axios.get(`${API_URL}/users/`, { headers: { Authorization: `Bearer ${storedToken}` } });
      const profile = response.data;
      setProfile(profile);
    } catch (error) {
      // Handle error
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    getLocations();
    getEvents();
  }, []);

  useEffect(() => {
    getMatch();
    getProfile();
  }, [user]);

  return (
    <>
      <Navbar profile={profile} />
      <button className='mute' onClick={toggleSound}>
        {isPlaying ? 'Mute' : 'Unmute'}
      </button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/locations' element={<Locations locations={locations} />} />
        <Route path='/users' element={<IsPrivate><Users profile={profile} matches={matches} /></IsPrivate>} />
        <Route path='/locations/:locationId' element={<LocationInfo profile={profile} locations={locations} getLocations={getLocations} />} />
        <Route path='/events' element={<Events events={events} setEvents={setEvents} />} />
        <Route path='/profile/:profileId' element={<Profile profile={profile} getProfile={getProfile} />} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/loginForm' element={<IsAnon><LoginForm /></IsAnon>} />
        <Route path='/users/challengeform' element={<IsPrivate><ChallengeForm matches={matches} locations={locations} getMatch={getMatch} /></IsPrivate>} />
        <Route path='/creatematches' element={<IsPrivate><Matches matches={matches} locations={locations} getMatch={getMatch} /></IsPrivate>} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/editmatch/:matchId' element={<EditMatch getMatch={getMatch} locations={locations} />}></Route>
      </Routes>
      <Footer />
      <audio ref={audioRef} src={sound} autoPlay loop />
    </>
  );
}

export default App;