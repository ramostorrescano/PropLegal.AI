import React, { useState, useEffect } from 'react';
import { Upload, DollarSign, Send, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your key

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

  const plans = [
    { name: 'Starter (Beta)', docs: 10, price: 59, pricePerDoc: 5.90, note: 'Early adopter deal — best for testing' },
    { name: 'Pro', docs: 25, price: 135, pricePerDoc: 5.40, note: 'For busy professionals or teams' },
    { name: 'Scale', docs: 50, price: 250, pricePerDoc: 5.00, note: 'Best value for high-volume users' },
    { name: 'Top-Up', docs: 1, price: 8, pricePerDoc: 8, note: 'Flexibility when you need just one' },
  ];

  const handleSignup = async (e, plan) => {
    e.preventDefault();
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, plan: plan.name, price: plan.price }),
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
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();
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

  // Styles
  const containerStyle = { backgroundColor: '#1E3855', color: '#FFFFFF', padding: '40px', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' };
  const logoStyle = { width: '40px', height: '40px', transition: 'transform 0.2s' };
  const contentStyle = { maxWidth: '800px', margin: '0 auto', textAlign: 'center' };
  const headingStyle = { fontSize: '2.5rem', fontWeight: '600', marginBottom: '20px', transition: 'color 0.2s' };
  const subheadingStyle = { fontSize: '1.2rem', marginBottom: '40px', transition: 'color 0.2s' };
  const sectionStyle = { marginBottom: '40px', textAlign: 'left' };
  const sectionHeadingStyle = { fontSize: '1.5rem', fontWeight: '500', marginBottom: '15px', transition: 'color 0.2s' };
  const inputStyle = { display: 'block', width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#1E3855' };
  const buttonStyle = { backgroundColor: '#3B5998', color: '#FFFFFF', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', transition: 'background-color 0.2s' };
  const buttonDisabledStyle = { ...buttonStyle, backgroundColor: '#2A4373', cursor: 'not-allowed' };
  const planCardStyle = { backgroundColor: '#2A4A70', padding: '20px', borderRadius: '8px', margin: '10px', flex: '1', minWidth: '200px', transition: 'transform 0.2s' };
  const planGridStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headingStyle}>PropLegal.AI</h1>
        <img src={logoBase64} alt="Logo" style={logoStyle} onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} />
      </header>
      <div style={contentStyle}>
        <p style={subheadingStyle}>AI-powered legal document tool</p>

        {/* Pricing Plans */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Choose Your Plan</h2>
          <div style={planGridStyle}>
            {plans.map((plan) => (
              <div key={plan.name} style={planCardStyle} onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')} onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}>
                <h3>{plan.name}</h3>
                <p>{plan.docs} Docs/Month</p>
                <p><strong>${plan.price}</strong> (${plan.pricePerDoc}/doc)</p>
                <p>{plan.note}</p>
                <button
                  onClick={(e) => handleSignup(e, plan)}
                  style={loading ? buttonDisabledStyle : buttonStyle}
                  disabled={loading}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2A4373')}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3B5998')}
                >
                  {loading ? <Loader size={18} /> : <DollarSign size={18} />}
                  {loading ? 'Processing...' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Signup Form */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Sign Up</h2>
          <form onSubmit={(e) => handleSignup(e, plans[0])}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} disabled={loading} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={inputStyle} disabled={loading} />
            <button type="submit" style={loading ? buttonDisabledStyle : buttonStyle} disabled={loading}>
              {loading ? <Loader size={18} /> : <DollarSign size={18} />}
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
        </section>

        {/* File Upload */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Upload Document</h2>
          <form onSubmit={handleFileUpload}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} disabled={loading} />
            <button type="submit" style={loading ? buttonDisabledStyle : buttonStyle} disabled={loading}>
              {loading ? <Loader size={18} /> : <Upload size={18} />}
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </section>

        {/* AI Chat */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Ask the AI</h2>
          <form onSubmit={handleAskAI}>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a legal question..." style={inputStyle} disabled={loading} />
            <button type="submit" style={loading ? buttonDisabledStyle : buttonStyle} disabled={loading}>
              {loading ? <Loader size={18} /> : <Send size={18} />}
              {loading ? 'Asking...' : 'Ask'}
            </button>
          </form>
          {answer && <p style={{ backgroundColor: '#2A4A70', padding: '12px', borderRadius: '8px', marginTop: '10px' }}><strong>Answer:</strong> {answer}</p>}
        </section>
      </div>
    </div>
  );
}

export default App;
