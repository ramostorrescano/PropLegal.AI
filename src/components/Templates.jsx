import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CloudUploadIcon, PlusIcon } from '@heroicons/react/24/outline';

const Templates = () => {
  const [providedTemplates, setProvidedTemplates] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateFile, setNewTemplateFile] = useState(null);

  useEffect(() => {
    // Simulate fetching provided templates from your backend
    const fetchProvidedTemplates = async () => {
      try {
        const response = await fetch('/api/templates/provided'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch provided templates');
        }
        const data = await response.json();
        setProvidedTemplates(data);
      } catch (error) {
        console.error('Error fetching provided templates:', error);
      }
    };

    fetchProvidedTemplates();
  }, []);

  const handleFileChange = (event) => {
    setNewTemplateFile(event.target.files[0]);
  };

  const handleUploadTemplate = async () => {
    if (!newTemplateFile || !newTemplateName.trim()) {
      setUploadError('Please select a file and enter a template name.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('name', newTemplateName.trim());
    formData.append('file', newTemplateFile);

    try {
      // Replace with your actual API endpoint for uploading user templates
      const response = await fetch('/api/templates/user/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to upload template');
      }

      // Simulate successful upload (you might want to refetch user templates here)
      console.log('Template uploaded successfully!');
      setNewTemplateName('');
      setNewTemplateFile(null);
      // Consider refetching user templates to update the list
    } catch (error) {
      console.error('Error uploading template:', error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Templates Library</h1>

        {/* Upload Your Own Template Section */}
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Upload Your Own Template</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="template-name" className="block text-gray-700 text-sm font-bold mb-2">
                Template Name:
              </label>
              <input
                type="text"
                id="template-name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Standard Commercial Lease"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="template-file" className="block text-gray-700 text-sm font-bold mb-2">
                Upload File:
              </label>
              <div className="relative border rounded-md p-2 bg-gray-50">
                <label htmlFor="template-file" className="cursor-pointer flex items-center space-x-2">
                  <CloudUploadIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-500 text-sm">{newTemplateFile ? newTemplateFile.name : 'Choose File'}</span>
                </label>
                <input
                  id="template-file"
                  type="file"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleUploadTemplate}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Template'}
              </button>
            </div>
          </div>
          {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
        </div>

        {/* Provided Templates Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Available Templates</h2>
          {providedTemplates.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {providedTemplates.map((template) => (
                <li key={template.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-md font-semibold text-gray-800 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.description || 'A standard legal template.'}</p>
                  <Link
                    to={`/new-document?templateId=${template.id}`} // Example: Pass template ID to new document page
                    className="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Use Template
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No templates available yet.</p>
          )}
        </div>

        {/* We are removing the "Your Templates" section for now */}
      </div>
    </div>
  );
};

export default Templates;
