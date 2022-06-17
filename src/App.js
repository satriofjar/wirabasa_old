import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Products from './pages/Products';

function App() {
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)

  return (
      
      <Router>
        <Routes>
          <Route path='/' element={
            <Home 
            setSelectedProductCategory={setSelectedProductCategory}
            setSelectedCategory={setSelectedCategory}/>
          }/>
          <Route path='/login' element={
            <Login />
          }/>
          <Route path='/register' element={
            <Register />
          }/>

          <Route path='/detail-product' element={
            <Products 
            selectedProductCategory={selectedProductCategory}
            selectedCategory={selectedCategory} />
          }/>
        </Routes>
      </Router>
  );
}

export default App;
