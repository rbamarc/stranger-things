import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import AppNavbar from './components/AppNavbar';
import CreatePostForm from './components/CreatePostForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <AppNavbar />
        
        <Routes>
          
          <Route path="/" element={<PostList />} />
          
          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/signup" element={<SignUpForm />} />
          
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/create" element={<CreatePostForm/>}/>
            
        </Routes>
        
      </Router>

    </div>
  )
}

export default App;
