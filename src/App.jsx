import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;
