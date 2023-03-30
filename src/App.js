import './App.css';
import Navbar from './components/navbar';
import Header from './components/header';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <BrowserRouter>
        <Header />
      <div className='flex w-screen'>
        <Navbar />
        <div className=' overflow-y-scroll h-[85vh] w-full '>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        
      </Routes>
      </div>
      </div>
      

    </BrowserRouter>
  );
}

export default App;
