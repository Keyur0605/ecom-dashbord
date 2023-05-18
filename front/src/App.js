import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import {Route , Routes,BrowserRouter} from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import Add from './components/Add';
import Home from './components/Home';
import Protected from './components/Protected';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Protected Cmp={Home}/>}></Route>

      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
       {/* <Route path='/add' element={<Add/>}></Route> */}
      <Route path='/update/:id' element={<Update/>}></Route> 
      <Route path='/add' element={<Protected Cmp={Add}/>}></Route>
    
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
