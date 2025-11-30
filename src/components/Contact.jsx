import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '3rem',
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>Get In <span className="gradient-text">Touch</span></h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem'
                }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>Let's Talk</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            I'm currently open to new opportunities and collaborations.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <div style={{
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    color: 'var(--accent-cyan)'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <span>aryan.khunt@example.com</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <div style={{
                                    background: 'rgba(188, 19, 254, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    color: 'var(--accent-purple)'
                                }}>
                                    <MapPin size={24} />
                                </div>
                                <span>Gujarat, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} style={{
                        background: 'var(--bg-primary)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            ></textarea>
                        </div>

                        <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: status === 'sending' ? 0.7 : 1
                        }}>
                            {status === 'sending' ? 'Sending...' : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <p style={{ color: '#00ff88', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p style={{ color: '#ff4444', marginTop: '1rem', textAlign: 'center' }}>Failed to send message. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
