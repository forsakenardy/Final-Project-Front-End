import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
      <NavbarLogged />
      <Footer />


      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/locations' element={<Locations />} />
        <Route path='/users' element={<Users />} />
        <Route path='/locations/:locationsId' element={<LocationInfo />} />
        <Route path='/events' element={<Events />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signForm' element={<SignForm />} />
        <Route path='/loginForm' element={<LoginForm />} />
        <Route path='/users/challengeForm' element={<ChallengeForm />} />
        <Route path='/matches' element={<Matches />} />
      </Routes>
    </>
  );
}

export default App;