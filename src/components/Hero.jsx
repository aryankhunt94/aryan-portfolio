import React from 'react';

const Hero = () => {
    return (
        <section id="home" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '80px'
        }}>
            <div className="container">
                <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--accent-cyan)',
                    marginBottom: '1rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>Hello, I am</h2>
                <h1 style={{
                    fontSize: '5rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    lineHeight: 1.1
                }}>
                    Aryan <span className="gradient-text">Khunt</span>
                </h1>
                <p style={{
                    fontSize: '2rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '3rem'
                }}>
                    Full Stack <span style={{ color: 'white' }}>Web Developer</span>
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-primary">View Projects</button>
                    <button style={{
                        background: 'transparent',
                        border: '2px solid var(--accent-purple)',
                        color: 'white',
                        padding: '0.8rem 2rem',
                        borderRadius: '50px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>Contact Me</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
