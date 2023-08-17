import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import SinglePost from './components/SinglePost';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar/>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other routes here as needed */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
