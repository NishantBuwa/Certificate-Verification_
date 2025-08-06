import './App.css';
import Home from './pages/Home'
import { useState } from 'react';
import Header from './components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admin from './pages/Admin';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <div className="App">
      <Router>
        <AppContent/>
      </Router>
      <ToastContainer autoClose={2000}/>
      {/* <Home></Home> */}
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin'

  const [admin, setAdmin] = useState({
    name: '',
    iname: '',
    id:''
  })

  return (
    <div className="flex flex-col h-screen">
      {!isAdmin && <Header />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup setAdmin={setAdmin} />}></Route>
        <Route path='/login' element={<Login admin={admin} setAdmin={setAdmin} />}></Route>
        <Route path='/admin' element={
          <div className="flex flex-grow">
            <Admin admin={admin} setAdmin={setAdmin}/>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App;