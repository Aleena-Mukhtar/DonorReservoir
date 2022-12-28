import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Auth/Navbar';

export default function Container() {
  return (
    <div className='container'>
        <Router>
            <Routes>
                <Route exact path='/' element={<Navbar/>} />
            </Routes>
        </Router>
    </div>
  )
}
