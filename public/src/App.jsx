import React, { useState, useEffect } from 'react';
import { Upload, DollarSign, Send, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import io from 'socket.io-client';

const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your key

// Base64 logo (white "P" on blue circle)
const logoBase64 = 'data:image/svg+xml;base64,' +
  btoa(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#3B5998"/>
    <text x="50%" y="50%" font-family="Poppins" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dy=".3em">P</text>
  </svg>`);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // Socket.IO (optional)
  useEffect(() => {
    const newSocket = io('your-socket-server-url'); // Replace or remove if not needed
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  // Handlers
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed!');
    }
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Upload success:', data);
      alert('File uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    }
    setLoading(false);
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('AI error:', error);
      setAnswer('Error: Could not reach AI');
    }
    setLoading(false);
  };

  // Styles with hover effects
  const containerStyle = {
    backgroundColor: '#1E3855',
    color: '#FFFFFF',
    padding: '40px',
    minHeight: '100vh',
    fontFamily: 'Poppins, Arial, sans-serif',
    position: 'relative',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    transition: 'transform 0.2s', // Hover effect
    ':hover': { transform: 'scale(1.1)' }, // Slight scale on hover
  };

  const contentStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '20px',
    transition: 'color 0.2s',
    ':hover': { color: '#E6E6E6' }, // Brighten on hover
  };

  const subheadingStyle = {
    fontSize: '1.2rem',
    marginBottom: '40px',
    transition: 'color 0.2s',
    ':hover': { color: '#E6E6E6' },
  };

  const sectionStyle = {
    marginBottom: '40px',
    textAlign: 'left',
  };

  const sectionHeadingStyle = {
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '15px',
    transition: 'color 0.2s',
    ':hover': { color: '#E6E6E6' },
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#1E3855',
    fontFamily: 'Poppins, Arial, sans-serif',
    transition: 'box-shadow 0.2s',
    ':focus': { boxShadow: '0 0 5px #3B5998' }, // Focus effect
  };

  const buttonStyle = {
    backgroundColor: '#3B5998',
    color: '#FFFFFF',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    fontFamily: 'Poppins, Arial, sans-serif',
    transition: 'background-color 0.2s',
    ':hover': { backgroundColor: '#2A4373' }, // Darken on hover
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#2A4373',
    cursor: 'not-allowed',
    ':hover': { backgroundColor: '#2A4373' }, // No change on hover when disabled
  };

  const signupButtonStyle = {
    ...buttonStyle,
    margin: '20px auto',
    padding: '12px 32px',
    fontSize: '1.1rem',
  };

  const signupButtonDisabledStyle = {
    ...signupButtonStyle,
    ...buttonDisabledStyle,
  };

  const answerStyle = {
    backgroundColor: '#2A4A70',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '10px',
    fontFamily: 'Poppins, Arial, sans-serif',
    transition: 'color 0.2s',
    ':hover': { color: '#E6E6E6' },
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headingStyle}>PropLegal.AI</h1>
        <img
          src={logoBase64}
          alt="PropLegal.AI Logo"
          style={logoStyle}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </header>
      <div style={contentStyle}>
        <p style={subheadingStyle}>AI-powered legal document tool</p>

        {/* Sign Up & Get Started Button */}
        <button
          onClick={handleSignup}
          style={loading ? signupButtonDisabledStyle : signupButtonStyle}
          disabled={loading}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2A4373')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3B5998')}
        >
          {loading ? <Loader size={18} /> : <DollarSign size={18} />}
          {loading ? 'Processing...' : 'Sign Up & Get Started'}
        </button>

        {/* Signup Form */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={inputStyle}
              disabled={loading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={inputStyle}
              disabled={loading}
            />
            <button
              type="submit"
              style={loading ? buttonDisabledStyle : buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2A4373')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3B5998')}
            >
              {loading ? <Loader size={18} /> : <DollarSign size={18} />}
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
        </section>

        {/* File Upload Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Upload Document</h2>
          <form onSubmit={handleFileUpload}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ ...inputStyle, padding: '8px' }}
              disabled={loading}
            />
            <button
              type="submit"
              style={loading ? buttonDisabledStyle : buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2A4373')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3B5998')}
            >
              {loading ? <Loader size={18} /> : <Upload size={18} />}
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </section>

        {/* AI Chat Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Ask the AI</h2>
          <form onSubmit={handleAskAI}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a legal question..."
              style={inputStyle}
              disabled={loading}
            />
            <button
              type="submit"
              style={loading ? buttonDisabledStyle : buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2A4373')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3B5998')}
            >
              {loading ? <Loader size={18} /> : <Send size={18} />}
              {loading ? 'Asking...' : 'Ask'}
            </button>
          </form>
          {answer && (
            <p
              style={answerStyle}
              onMouseEnter={(e) => (e.target.style.color = '#E6E6E6')}
              onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
            >
              <strong>Answer:</strong> {answer}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
