import "./App.css";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeMain from "./HomeMain";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";
import Courses from "./components/Courses/Courses";
import Course1 from "./components/Courses/Course1";
import RegistrationForm from "./components/Home/registration";
import MyCoursesPage from "./components/myLearning/MyLearning"
import Login from "./components/Login";
import StockChart from "./components/myLearning/Treadcanvas/Treadcanvas";
import DiscussionSection from "./components/discussion/discussion";
import CommentSection from "./components/discussion/discussion";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data is stored in cookies
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleData = (data) => {
    // Save user data in cookies
    Cookies.set('user', JSON.stringify(data), { expires: 7 });
    setUser(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeMain />} >
          <Route path="" element={<Home />} />
          <Route path="dashboard" element={user && user._id ? <Dashboard data={user} /> : <Login handleLogin={handleData} />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses data={user} />} />
          <Route path="/Mylearning" element={<MyCoursesPage />} />
          <Route path="course1" element={<Course1 data={user} />} />
          <Route path="Discussion" element={<DiscussionSection />} />
          <Route path="/reg" element={<RegistrationForm />} />
          <Route path='/tread' element={<StockChart />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;