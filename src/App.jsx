// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Layout/Header";
import UserState from "./contexts/users/UserState";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProductsState from "./contexts/products/ProductsState";
import Cart from "./components/Cart/Cart";
import Success from "./components/Success";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (    
    <UserState>
      <ProductsState>
        <Router>
        <ScrollToTop />
          <Header />
          {/* RUTAS PÚBLICAS */}
          <Routes>
            {/* RUTAS Privadas */}
            <Route path="/perfil" element={<Profile />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </ProductsState>
    </UserState>

  );
}

export default App;