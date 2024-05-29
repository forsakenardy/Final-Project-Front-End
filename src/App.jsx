import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavbarLogged from './components/NavbarLogged';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Locations from './pages/Locations';
import Users from './pages/Users';
import LocationInfo from './pages/LocationInfo';
import Events from './pages/Events';
import Profile from './pages/Profile';
import SignForm from './pages/SignForm';
import LoginForm from './pages/LoginForm';
import ChallengeForm from './pages/ChallengeForm';
import Matches from './pages/Matches';
import AboutUs from './pages/AboutUs';


function App() {


  const [locations, setLocations] = useState([])


  const getLocations = async () => {
    const { data: locations, error } = await supabase.from("armament").select('*'); //mira esto para el map
    if (error) {
      console.log("there was an error ", error);
      return;
    }
    else {
      console.log("data fetched succesfully: ", locations);
      setLocations(locations);
    }
  }

  useEffect(() => {
    getLocations();
  }, [])


  return (
    <>
      <NavbarLogged />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/locations' element={<Locations locations={locations} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/locations/:locationsId' element={<LocationInfo />} />
        <Route path='/events' element={<Events />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signForm' element={<SignForm />} />
        <Route path='/loginForm' element={<LoginForm />} />
        <Route path='/users/challengeForm' element={<ChallengeForm />} />
        <Route path='/matches' element={<Matches />} />
        <Route path='/aboutUs' element={<AboutUs />} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;