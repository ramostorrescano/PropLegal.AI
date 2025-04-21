import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloudUploadIcon, FolderOpenIcon, FilePlusIcon, LightBulbIcon } from '@heroicons/react/24/outline'; // Example icons

const DashboardHarveyInspired = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    // Simulate file upload
    console.log('Dropped files:', files);
    setUploadedFiles(files);
    // In a real application, you would send these files to your backend
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setUploadedFiles([file]);
      // In a real application, you would send this file to your backend
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6">PropLegal.AI Assistant</h1>

        {/* Primary Task Area - Mimicking Harvey's focused approach */}
        <div
          className={`relative bg-white rounded-md shadow-md p-8 flex flex-col items-center justify-center border-2 border-dashed ${
            dragActive ? 'border-blue-500' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CloudUploadIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm mb-4">Drag and drop files here</p>
          <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:underline text-sm">
            Or click here to upload
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />

          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={file.name} className="text-sm text-gray-600">{file.name}</li>
                ))}
              </ul>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                Process Files
              </button>
              {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
            </div>
          )}
        </div>

        {/* Secondary Navigation/Actions - Left Sidebar Style (Simplified) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/documents" className="bg-white shadow-md rounded-md p-4 flex items-center space-x-3 hover:shadow-lg transition-shadow">
            <FolderOpenIcon className="h-6 w-6 text-blue-500" />
            <span className="text-gray-700 font-medium">Document Vault</span>
          </Link>
          <Link to="/new-document" className="bg-white shadow-md rounded-md p-4 flex items-center space-x-3 hover:shadow-lg transition-shadow">
            <FilePlusIcon className="h-6 w-6 text-green-500" />
            <span className="text-gray-700 font-medium">Create New</span>
          </Link>
          <Link to="/templates" className="bg-white shadow-md rounded-md p-4 flex items-center space-x-3 hover:shadow-lg transition-shadow">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-700 font-medium">Templates</span>
          </Link>
          {/* Add more quick links based on key features */}
        </div>

        {/* Optional: Recent Activity or Quick Insights (Below the main area) */}
        {/* <div className="mt-8 bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul>
            <li className="py-2 border-b text-sm text-gray-600">Document "Commercial Lease for 123 Main St" updated by John Doe</li>
            <li className="py-2 border-b text-sm text-gray-600">New comment on "NDA with Acme Corp"</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHarveyInspired;
