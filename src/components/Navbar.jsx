import React from 'react';

const Navbar = () => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '1.5rem 0',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(10, 10, 10, 0.8)',
            zIndex: 1000,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Aryan<span className="gradient-text">.dev</span>
                </h1>
                <ul style={{
                    display: 'flex',
                    gap: '2rem',
                    listStyle: 'none'
                }}>
                    {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}
                                onMouseOver={(e) => e.target.style.color = 'var(--accent-cyan)'}
                                onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
