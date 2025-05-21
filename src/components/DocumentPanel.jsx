// components/DocumentPanel.jsx
import React from 'react';
import { FilePlus, FileText, Check } from 'lucide-react';

const DocumentPanel = ({ 
  isAuthenticated, 
  documents, 
  onToggleDocument, 
  onUpload, 
  onSignInClick 
}) => {
  return (
    <div className="w-1/4 bg-gray-800 border-r border-blue-500/30 flex flex-col">
      <div className="p-4 border-b border-blue-500/30">
        <button 
          onClick={onUpload}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md transition-colors"
        >
          <FilePlus size={18} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <h2 className="text-sm text-gray-400 mb-2 px-2">
          {isAuthenticated ? "Your Documents" : "Sign in to view documents"}
        </h2>
        
        {isAuthenticated ? (
          documents.length > 0 ? (
            <ul className="space-y-1">
              {documents.map(doc => (
                <li 
                  key={doc.id} 
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    doc.selected ? 'bg-blue-900/40 border border-blue-500/50' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => onToggleDocument(doc.id)}
                >
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-400 mr-2" />
                    <span className="text-sm truncate">{doc.name}</span>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${
                    doc.selected ? 'bg-blue-500' : 'border border-gray-500'
                  }`}>
                    {doc.selected && <Check size={12} />}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No documents yet</p>
            </div>
          )
        ) : (
          <div className="text-center py-10 text-gray-500">
            <button 
              onClick={onSignInClick}
              className="text-blue-400 underline"
            >
              Sign in
            </button>
            <p className="mt-2">to access your documents</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPanel;