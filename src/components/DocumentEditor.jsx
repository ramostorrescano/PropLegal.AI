import React, { useState, useEffect, useRef } from 'react';
import { Save, Download, Send, MessageSquare, AlertTriangle, CheckCircle, Info, X, ChevronRight, ChevronLeft, Users, FileText, Edit, Lock } from 'lucide-react';
import { mockGenerateSummary, mockRiskAnalysis } from '../lib/mockApi';

const DocumentEditor = () => {
  const [showAssistant, setShowAssistant] = useState(true);
  const [activeSection, setActiveSection] = useState('comments');
  const [content, setContent] = useState(`THIS LEASE AGREEMENT (this "Agreement") is made and entered into as of April 17, 2025, by and between URBAN PROPERTIES INC., a New York corporation ("Landlord"), and FASHION BOUTIQUE LLC, a New York limited liability company ("Tenant").

ARTICLE 1 - PREMISES AND TERM
1.1 Premises. Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, that certain commercial space consisting of approximately 2,500 square feet, located at 456 Broadway, New York, NY (the "Premises").

1.2 Term. The term of this Lease shall be five (5) years, commencing on May 1, 2025 (the "Commencement Date") and expiring on April 30, 2030 (the "Expiration Date"), unless sooner terminated as provided herein.

1.3 Option to Renew. Tenant shall have one (1) option to renew this Lease for an additional five (5) year term by providing Landlord with written notice at least 180 days prior to the Expiration Date.

ARTICLE 2 - RENT
2.1 Base Rent. Tenant shall pay to Landlord as base rent for the Premises the sum of $8,500 per month ("Base Rent"). Base Rent shall be payable in advance on the first day of each calendar month during the Term.

2.2 Annual Increases. The Base Rent shall increase by three percent (3%) on each anniversary of the Commencement Date.

2.3 Additional Rent. In addition to Base Rent, Tenant shall pay as additional rent Tenant's proportionate share of Operating Expenses as provided in Article 3 below.

ARTICLE 3 - OPERATING EXPENSES
3.1 Operating Expenses. In addition to the Base Rent, Tenant shall pay to Landlord Tenant's proportionate share of the Operating Expenses for the Building. "Operating Expenses" shall mean all expenses, costs, and disbursements of every kind and nature, which Landlord shall pay or become obligated to pay in connection with the ownership, management, maintenance, repair, and operation of the Building.

3.2 Payment of Operating Expenses. Landlord shall deliver to Tenant a statement showing Landlord's reasonable estimate of the Operating Expenses for each calendar year. Tenant shall pay to Landlord one-twelfth (1/12) of Tenant's proportionate share of the estimated Operating Expenses monthly in advance.

ARTICLE 4 - SECURITY DEPOSIT
4.1 Security Deposit. Upon execution of this Lease, Tenant shall deposit with Landlord the sum of $17,000 (the "Security Deposit") as security for Tenant's faithful performance of Tenant's obligations hereunder.

ARTICLE 5 - USE OF PREMISES
5.1 Permitted Use. The Premises shall be used and occupied by Tenant solely for retail sale of clothing and accessories and for no other purpose without the prior written consent of Landlord.

5.2 Compliance with Laws. Tenant shall, at Tenant's expense, comply with all laws, rules, regulations, and ordinances applicable to the Premises or Tenant's use thereof.

ARTICLE 6 - MAINTENANCE AND REPAIRS`);
  const [comments, setComments] = useState([]);
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'John Doe', avatar: 'JD', role: 'Admin', status: 'online' },
    { id: 2, name: 'Jane Smith', avatar: 'JS', role: 'Editor', status: 'offline' },
  ]);
  const [versions, setVersions] = useState([
    { id: 1, timestamp: 'April 17, 2025 10:00 AM', user: 'John Doe', changes: 'Initial draft created' },
  ]);
  const [clauses, setClauses] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const [trackChanges, setTrackChanges] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    // Mock clause analysis on mount
    analyzeClauses();
  }, []);

  const analyzeClauses = async () => {
    const clauseData = await mockRiskAnalysis(content);
    setClauses(clauseData);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    // Simulate autosave
    setVersions([...versions, {
      id: versions.length + 1,
      timestamp: new Date().toLocaleString(),
      user: 'John Doe',
      changes: 'Edited document content',
    }]);
  };

  const handleAddComment = () => {
    const newComment = {
      id: comments.length + 1,
      user: 'John Doe',
      content: 'Please review this clause for compliance.',
      timestamp: new Date().toLocaleString(),
      resolved: false,
    };
    setComments([...comments, newComment]);
  };

  const handleResolveComment = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, resolved: true } : comment
    ));
  };

  const handleGenerateSummary = async () => {
    const generatedSummary = await mockGenerateSummary(content);
    setSummary(generatedSummary);
    setShowSummary(true);
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting document as ${format}`);
  };

  return (
    <div className="document-editor">
      <div className="editor-header">
        <h1>Commercial Lease Agreement</h1>
        <div className="editor-actions">
          <button className="btn-primary" onClick={() => console.log('Saving...')}>
            <Save size={16} /> Save
          </button>
          <button className="btn-primary" onClick={handleGenerateSummary}>
            <FileText size={16} /> Generate Summary
          </button>
          <button className="btn-primary" onClick={() => handleExport('PDF')}>
            <Download size={16} /> Export as PDF
          </button>
          <button className="btn-primary">
            <Send size={16} /> Send for Signature
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => setTrackChanges(!trackChanges)}
            style={{ backgroundColor: trackChanges ? 'var(--primary-light)' : 'transparent' }}
          >
            <Edit size={16} /> {trackChanges ? 'Disable Track Changes' : 'Enable Track Changes'}
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-pane" style={{ flex: showAssistant ? 3 : 5 }}>
          <div className="collaborators-bar">
            {collaborators.map(collab => (
              <div key={collab.id} className={`collaborator ${collab.status}`}>
                <span className="avatar">{collab.avatar}</span>
                <span className="collab-name">{collab.name}</span>
              </div>
            ))}
          </div>
          <textarea
            ref={editorRef}
            className="editor-content"
            value={content}
            onChange={handleContentChange}
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>

        {showAssistant && (
          <div className="sidebar-pane">
            <div className="sidebar-tabs">
              <button 
                className={activeSection === 'comments' ? 'active' : ''} 
                onClick={() => setActiveSection('comments')}
              >
                Comments
              </button>
              <button 
                className={activeSection === 'insights' ? 'active' : ''} 
                onClick={() => setActiveSection('insights')}
              >
                Clause Insights
              </button>
              <button 
                className={activeSection === 'versions' ? 'active' : ''} 
                onClick={() => setActiveSection('versions')}
              >
                Versions
              </button>
            </div>

            {activeSection === 'comments' && (
              <div className="comments-section">
                <button className="btn-primary" onClick={handleAddComment}>
                  <MessageSquare size={16} /> Add Comment
                </button>
                {comments.map(comment => (
                  <div key={comment.id} className={`comment ${comment.resolved ? 'resolved' : ''}`}>
                    <div className="comment-header">
                      <span>{comment.user}</span>
                      <span>{comment.timestamp}</span>
                    </div>
                    <p>{comment.content}</p>
                    {!comment.resolved && (
                      <button className="btn-secondary" onClick={() => handleResolveComment(comment.id)}>
                        <CheckCircle size={16} /> Resolve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'insights' && (
              <div className="insights-section">
                {clauses.map(clause => (
                  <div key={clause.id} className={`clause-item risk-${clause.risk}`}>
                    <div className="clause-header">
                      <span>{clause.name}</span>
                      <span className={`risk-indicator risk-${clause.risk}`}>
                        <AlertTriangle size={16} /> {clause.risk.charAt(0).toUpperCase() + clause.risk.slice(1)}
                      </span>
                    </div>
                    <p>{clause.explanation}</p>
                    <div className="clause-actions">
                      <button className="btn-secondary">
                        <Info size={16} /> View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'versions' && (
              <div className="versions-section">
                {versions.map(version => (
                  <div key={version.id} className="version-item">
                    <div className="version-header">
                      <span>{version.user}</span>
                      <span>{version.timestamp}</span>
                    </div>
                    <p>{version.changes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button 
          className="toggle-sidebar" 
          onClick={() => setShowAssistant(!showAssistant)}
        >
          {showAssistant ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {showSummary && summary && (
        <div className="summary-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Deal Summary</h2>
              <button onClick={() => setShowSummary(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="summary-content">
              <p><strong>Key Parties:</strong> {summary.parties.join(' & ')}</p>
              <p><strong>Lease Start Date:</strong> {summary.startDate}</p>
              <p><strong>Lease End Date:</strong> {summary.endDate}</p>
              <p><strong>Payment Terms:</strong> {summary.paymentTerms}</p>
              <p><strong>Responsibilities:</strong> {summary.responsibilities}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => handleExport('PDF')}>
                <Download size={16} /> Download PDF
              </button>
              <button className="btn-primary" onClick={() => handleExport('Word')}>
                <Download size={16} /> Download Word
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
