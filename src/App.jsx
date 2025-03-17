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
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (    
    <UserState>
      <ProductsState>
        <Router>
        <ScrollToTop />
          <ErrorBoundary><Header /></ErrorBoundary>
          {/* RUTAS PÚBLICAS */}
          <Routes>
            {/* RUTAS Privadas */}
            <Route path="/perfil" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
            <Route path="/registro" element={<ErrorBoundary><Register /></ErrorBoundary>} />
            <Route path="/iniciar-sesion" element={<ErrorBoundary><Login /></ErrorBoundary>} />
            <Route path="/carrito" element={<ErrorBoundary><Cart /></ErrorBoundary>} />
            <Route path="/success" element={<ErrorBoundary><Success /></ErrorBoundary>} />
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          </Routes>
          <Footer />
        </Router>
      </ProductsState>
    </UserState>

  );
}

export default App;