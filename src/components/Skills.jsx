import React from 'react';

const skills = [
    { name: 'HTML', level: 'Advanced', color: '#E34F26', percentage: '95%' },
    { name: 'CSS', level: 'Advanced', color: '#1572B6', percentage: '90%' },
    { name: 'JavaScript', level: 'Advanced', color: '#F7DF1E', percentage: '85%' },
    { name: 'React', level: 'Intermediate', color: '#61DAFB', percentage: '80%' },
    { name: 'SQL', level: 'Intermediate', color: '#4479A1', percentage: '75%' },
    { name: 'PL/SQL', level: 'Intermediate', color: '#F80000', percentage: '70%' },
    { name: 'C', level: 'Intermediate', color: '#A8B9CC', percentage: '65%' },
    { name: 'C++', level: 'Intermediate', color: '#00599C', percentage: '60%' },
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem' }}>{skill.name}</h3>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{skill.percentage}</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '4px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '2px',
                                marginTop: '1rem'
                            }}>
                                <div style={{
                                    width: skill.percentage,
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
