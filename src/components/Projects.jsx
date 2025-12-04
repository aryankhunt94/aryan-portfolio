import React from 'react';
// Updated Projects List
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: 'Main Project',
        description: 'Developed during my internship using Java Spring Tool Suite. This project is a full-stack application built with Maven, showcasing robust backend logic and efficient build management.',
        tags: ['Java', 'Spring Tool Suite', 'Maven', 'Internship Project'],
        github: 'https://github.com/aryankhunt94/project.git',
        demo: null // Add demo link if available
    },
    {
        title: 'Interactive Calendar',
        description: 'A dynamic React application combining calendar functionality with creative tools. Features include event management, rich text note-taking, and a drawing canvas for visual planning.',
        tags: ['React', 'Vite', 'Canvas API', 'Note Taking'],
        github: 'https://github.com/aryankhunt94/Interactive_calender.git',
        demo: null
    },
];

const Projects = () => {
    return (
        <section id="projects" style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '3rem',
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>My <span className="gradient-text">Projects</span></h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <div key={index} style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 243, 255, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            background: 'rgba(0, 243, 255, 0.1)',
                                            color: 'var(--accent-cyan)',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        transition: 'color 0.3s'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                                        onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                                    >
                                        <Github size={20} /> Code
                                    </a>
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontWeight: '500',
                                            transition: 'color 0.3s'
                                        }}
                                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-purple)'}
                                            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                                        >
                                            <ExternalLink size={20} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
