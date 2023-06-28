import {Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage.js';
import Chatpage from './pages/chatpage.js';


function App() {
  return (
   <>
   <div className='App'>
    <Routes>
    <Route path='/' element={<Homepage/>}></Route>
   <Route path='/chats' element={<Chatpage/>}/>
   </Routes>
   </div>
   </>
  );
}

export default App;
