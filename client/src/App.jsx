import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomNavbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import LostItemPage from './components1/Lost';
import MapPage from './components1/MapPage';
import { Track } from './components1/Track';
import Found from './components1/found1';
import Foundd from './components1/Foundd';
import Trackfound from './components1/Trackfound';
import Matched from "./components1/Match";

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/lost" element={<LostItemPage/>}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/found/:id" element={<Found />} />
        <Route path="/found" element={<Foundd />} />
        <Route path="/track" element={<Track/>}/>
        <Route path="/trackfound" element={<Trackfound/>}/>
        <Route path="/matched" element={<Matched/>}/>

        
      </Routes>
    </Router>
  );
}

export default App;

