// pages/Home.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import DocumentPanel from '../components/DocumentPanel';
import ChatPanel from '../components/ChatPanel';
import SignInModal from '../components/SignInModal';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  // Sample documents for demonstration
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Project Proposal.pdf', selected: false },
    { id: 2, name: 'Meeting Notes.docx', selected: false },
    { id: 3, name: 'Research Paper.pdf', selected: false }
  ]);

  const toggleDocument = (id) => {
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, selected: !doc.selected } : doc
    );
    setDocuments(updatedDocs);
  };

  const handleUpload = (e) => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }
    // Handle file upload logic
    console.log("Upload triggered");
  };

  // Get selected documents
  const selectedDocuments = documents.filter(doc => doc.selected);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Header Component */}
      <Header 
        isAuthenticated={isAuthenticated} 
        onSignInClick={() => setShowSignInModal(true)} 
      />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Document Panel */}
        <DocumentPanel 
          isAuthenticated={isAuthenticated}
          documents={documents}
          onToggleDocument={toggleDocument}
          onUpload={handleUpload}
          onSignInClick={() => setShowSignInModal(true)}
        />

        {/* Chat Panel */}
        <ChatPanel 
          isAuthenticated={isAuthenticated}
          documents={documents}
          selectedDocuments={selectedDocuments}
          onToggleDocument={toggleDocument}
        />
      </div>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </div>
  );
};

export default Home;