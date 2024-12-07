import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container p-4">
      <h2 className="text-2xl font-bold mb-4">ಪ್ರೊಫೈಲ್</h2>
      <div className="profile-content">
        <p>ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ</p>
        
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          ಲಾಗ್ ಔಟ್
        </button>
      </div>
    </div>
  );
};

export default Profile;
