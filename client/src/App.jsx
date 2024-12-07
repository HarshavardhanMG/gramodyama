import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Import all components
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import ResourceLibrary from './pages/ResourceLibrary';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import SkillsDevelopment from './components/home/SkillsDevelopment';
import ExpertList from './components/experts/ExpertList';
import ExpertProfile from './components/experts/ExpertProfile';
import Videos from './components/library/Videos';
import Articles from './components/library/Articles';
import CoursesList from './components/courses/CoursesList';
import CourseDetail from './components/courses/CourseDetail';
import UserCourses from './components/courses/UserCourses';
import Certificate from './components/courses/Certificate';
import CourseProgress from './components/courses/CourseProgress';
import CourseLearning from './components/courses/CourseLearning';
import SchemesList from './components/schemes/SchemesList';
import SchemeDetails from './components/schemes/SchemeDetails';
import ApplicationProcess from './components/schemes/ApplicationProcess';
import IdeasHub from './components/ideas/IdeasHub';
import CreatePost from './components/ideas/CreatePost';
import IdeaFeed from './components/ideas/IdeaFeed';
import IdeaDetail from './components/ideas/IdeaDetail';
import InvestmentPage from './components/ideas/InvestmentPage';
import InvestmentDashboard from './components/dashboard/InvestmentDashboard';
import CommunityHub from './components/community/CommunityHub';
import MagazineHome from './components/magazine/MagazineHome';
import SubmitArticle from './components/magazine/SubmitArticle';
import ArticleDetail from './components/magazine/ArticleDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route path="/" element={<Layout />}>
          {/* Home and Dashboard */}
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="dashboard" element={<PrivateRoute><InvestmentDashboard /></PrivateRoute>} />
          
          {/* Skills Development */}
          <Route path="skills" element={<PrivateRoute><SkillsDevelopment /></PrivateRoute>} />

          {/* Experts */}
          <Route path="experts/:expertType" element={<PrivateRoute><ExpertList /></PrivateRoute>} />
          <Route path="experts/:expertType/:expertId" element={<PrivateRoute><ExpertProfile /></PrivateRoute>} />

          {/* Library */}
          <Route path="resources" element={<PrivateRoute><ResourceLibrary /></PrivateRoute>} />
          <Route path="library/videos" element={<PrivateRoute><Videos /></PrivateRoute>} />
          <Route path="library/articles" element={<PrivateRoute><Articles /></PrivateRoute>} />

          {/* Courses */}
          <Route path="courses" element={<PrivateRoute><CoursesList /></PrivateRoute>} />
          <Route path="courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
          <Route path="my-courses" element={<PrivateRoute><UserCourses /></PrivateRoute>} />
          <Route path="courses/:id/certificate" element={<PrivateRoute><Certificate /></PrivateRoute>} />
          <Route path="courses/:id/progress" element={<PrivateRoute><CourseProgress /></PrivateRoute>} />
          <Route path="courses/:id/learn" element={<PrivateRoute><CourseLearning /></PrivateRoute>} />

          {/* Schemes */}
          <Route path="schemes" element={<PrivateRoute><SchemesList /></PrivateRoute>} />
          <Route path="schemes/:id" element={<PrivateRoute><SchemeDetails /></PrivateRoute>} />
          <Route path="schemes/:id/apply" element={<PrivateRoute><ApplicationProcess /></PrivateRoute>} />

          {/* Ideas */}
          <Route path="ideas" element={<PrivateRoute><IdeasHub /></PrivateRoute>} />
          <Route path="ideas/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="ideas/:id" element={<PrivateRoute><IdeaDetail /></PrivateRoute>} />
          <Route path="ideas/:id/invest" element={<PrivateRoute><InvestmentPage /></PrivateRoute>} />

          {/* Community */}
          <Route path="community/:ideaId" element={<PrivateRoute><CommunityHub /></PrivateRoute>} />

          {/* Magazine */}
          <Route path="magazine" element={<PrivateRoute><MagazineHome /></PrivateRoute>} />
          <Route path="magazine/submit" element={<PrivateRoute><SubmitArticle /></PrivateRoute>} />
          <Route path="magazine/article/:id" element={<PrivateRoute><ArticleDetail /></PrivateRoute>} />

          {/* User Profile & Notifications */}
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import './styles/pages.css';
import './styles/experts.css';
import './styles/schemes.css';