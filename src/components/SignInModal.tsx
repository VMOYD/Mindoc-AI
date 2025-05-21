// components/SignInModal.jsx
import { X } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-blue-500/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors">
            Sign In
          </button>
          <p className="text-sm text-center text-gray-400">
            Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;