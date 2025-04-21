import React, { useState } from 'react';
import { Folder, File, Star, Search, Filter } from 'lucide-react';

const DocumentVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const documents = [
    { id: 1, title: 'Commercial Lease - 456 Broadway', type: 'Lease', date: 'April 15, 2025', status: 'Draft', tags: ['NYC', 'Retail'], folder: 'Deals', favorite: true },
    { id: 2, title: 'NDA - Johnson Properties', type: 'NDA', date: 'April 12, 2025', status: 'Signed', tags: ['Confidential'], folder: 'Clients', favorite: false },
    { id: 3, title: 'Purchase Agreement - Riverdale', type: 'Purchase', date: 'April 10, 2025', status: 'Review', tags: ['Commercial'], folder: 'Deals', favorite: true },
  ];

  const filteredDocuments = documents
    .filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(doc => filter === 'all' || doc.status.toLowerCase() === filter);

  return (
    <div className="vault-page">
      <div className="vault-header">
        <h1>Document Vault</h1>
        <div className="filter-container">
          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search documents or clauses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="signed">Signed</option>
          </select>
        </div>
      </div>

      <div className="documents-grid">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className={`document-card ${doc.favorite ? 'favorite' : ''}`}>
            <Star
              size={20}
              className="favorite-icon"
              fill={doc.favorite ? 'var(--primary-color)' : 'none'}
              onClick={() => console.log(`Toggle favorite for ${doc.title}`)}
            />
            <div className="document-icon">
              <File size={24} />
            </div>
            <div className="document-info">
              <h3>{doc.title}</h3>
              <p>Folder: {doc.folder} | Type: {doc.type} | Last Modified: {doc.date}</p>
              <div className="tag-list">
                {doc.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="document-actions">
              <button className="btn-primary">Open Document</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentVault;
