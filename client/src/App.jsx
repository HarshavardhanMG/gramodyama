import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SchemeDetails from './pages/SchemeDetails';
import ResourceLibrary from './pages/ResourceLibrary';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import './App.css';
import './styles/pages.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scheme-details" element={<SchemeDetails />} />
          <Route path="resources" element={<ResourceLibrary />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
