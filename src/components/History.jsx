import React from 'react';
import { Clock, Edit, User } from 'lucide-react';

const History = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Created document', document: 'Commercial Lease - 456 Broadway', timestamp: 'April 15, 2025 10:00 AM' },
    { id: 2, user: 'Jane Smith', action: 'Added comment', document: 'Commercial Lease - 456 Broadway', timestamp: 'April 15, 2025 11:30 AM' },
    { id: 3, user: 'John Doe', action: 'Edited clause', document: 'NDA - Johnson Properties', timestamp: 'April 12, 2025 2:00 PM' },
  ];

  return (
    <div className="history-page">
      <h1>History</h1>
      <div className="activity-feed">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-header">
              <span className="activity-user">{activity.user}</span>
              <span className="activity-timestamp">{activity.timestamp}</span>
            </div>
            <p>{activity.action} in <strong>{activity.document}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
