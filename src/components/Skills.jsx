import React from 'react';

const skills = [
    { name: 'HTML', level: 'Advanced', color: '#E34F26' },
    { name: 'CSS', level: 'Advanced', color: '#1572B6' },
    { name: 'JavaScript', level: 'Advanced', color: '#F7DF1E' },
    { name: 'React', level: 'Intermediate', color: '#61DAFB' },
    { name: 'SQL', level: 'Intermediate', color: '#4479A1' },
    { name: 'PL/SQL', level: 'Intermediate', color: '#F80000' },
    { name: 'C', level: 'Intermediate', color: '#A8B9CC' },
    { name: 'C++', level: 'Intermediate', color: '#00599C' },
];

const Skills = () => {
    return (
        <section id="skills" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '3rem',
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>My <span className="gradient-text">Skills</span></h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((skill) => (
                        <div key={skill.name} style={{
                            background: 'var(--bg-primary)',
                            padding: '2rem',
                            borderRadius: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'transform 0.3s, border-color 0.3s',
                            cursor: 'default'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = skill.color;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{skill.name}</h3>
                            <div style={{
                                width: '100%',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '2px',
                                marginTop: '1rem'
                            }}>
                                <div style={{
                                    width: '80%', // Placeholder width
                                    height: '100%',
                                    background: skill.color,
                                    borderRadius: '2px',
                                    boxShadow: `0 0 10px ${skill.color}`
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
