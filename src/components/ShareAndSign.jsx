import React, { useState } from 'react';
import { Send, File, CheckCircle, XCircle } from 'lucide-react';

const ShareAndSign = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Commercial Lease - 456 Broadway', status: 'pending', recipients: ['jane@doe.com'], dateSent: 'April 15, 2025' },
    { id: 2, title: 'NDA - Johnson Properties', status: 'signed', recipients: ['john@doe.com'], dateSigned: 'April 12, 2025' },
  ]);
  const [newRecipient, setNewRecipient] = useState('');

  const handleSendForSignature = (docId) => {
    // Mock DocuSign API call
    console.log(`Sending document ${docId} to ${newRecipient} for signature`);
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, status: 'pending', recipients: [...doc.recipients, newRecipient], dateSent: new Date().toLocaleDateString() } : doc
    ));
    setNewRecipient('');
  };

  return (
    <div className="share-sign-page">
      <h1>Share & Sign</h1>
      <p>Send documents for e-signature and track their status.</p>

      {documents.map(doc => (
        <div key={doc.id} className="share-sign-container">
          <div className="document-info">
            <File size={24} />
            <div>
              <h3>{doc.title}</h3>
              <p>Recipients: {doc.recipients.join(', ')}</p>
              {doc.status === 'pending' && <p>Sent on: {doc.dateSent}</p>}
              {doc.status === 'signed' && <p>Signed on: {doc.dateSigned}</p>}
            </div>
            <div className={`signature-status status-${doc.status}`}>
              {doc.status === 'pending' && <Send size={16} />}
              {doc.status === 'signed' && <CheckCircle size={16} />}
              {doc.status === 'declined' && <XCircle size={16} />}
              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
            </div>
          </div>

          {doc.status !== 'signed' && (
            <div className="send-signature">
              <input
                type="email"
                placeholder="Add recipient email..."
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="search-input"
              />
              <button
                className="btn-primary"
                onClick={() => handleSendForSignature(doc.id)}
                disabled={!newRecipient.includes('@')}
              >
                <Send size={16} /> Send for Signature
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShareAndSign;
