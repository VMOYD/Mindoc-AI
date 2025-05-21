// components/ChatPanel.jsx
import React from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatPanel = ({ 
  isAuthenticated, 
  documents, 
  selectedDocuments, 
  onToggleDocument 
}) => {
  // Check if chat should be enabled
  const isChatEnabled = isAuthenticated && selectedDocuments.length > 0;

  return (
    <div className="w-3/4 flex flex-col bg-gray-900 relative">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedDocuments.length > 0 ? (
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Selected documents:</p>
            <div className="flex flex-wrap gap-2">
              {documents.filter(doc => doc.selected).map(doc => (
                <div key={doc.id} className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <span>{doc.name}</span>
                  <X 
                    size={14} 
                    className="ml-2 cursor-pointer hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleDocument(doc.id);
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="bg-blue-500/10 rounded-full p-4 mb-4">
            <MessageSquare size={32} className="text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome to Showroom AI</h2>
          <p className="text-gray-400 max-w-md">
            {!isAuthenticated 
              ? "Sign in and select documents to start chatting" 
              : selectedDocuments.length === 0 
                ? "Select documents to start chatting" 
                : "Ask anything about your selected documents"}
          </p>
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-blue-500/30">
        <div className="relative">
          <input 
            type="text" 
            placeholder={isChatEnabled 
              ? "Ask a question about your documents..."
              : isAuthenticated 
                ? "Select documents to enable chat" 
                : "Sign in and select documents to chat"
            }
            disabled={!isChatEnabled}
            className={`w-full p-3 pr-10 rounded-lg bg-gray-800 border ${
              isChatEnabled 
                ? "border-blue-500/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                : "border-gray-700 text-gray-500"
            } focus:outline-none`}
          />
          <button 
            disabled={!isChatEnabled}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-md p-1 ${
              isChatEnabled 
                ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700" 
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;