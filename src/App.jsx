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
import NoSuccess from "./components/NoSuccess";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AuthRoute from "./components/Auth/AuthRoute";
import NotFound from './components/NotFound/NoFound';

function App() {
  return (    
    <UserState>
      <ProductsState>
        <Router>
        <ScrollToTop />
        <ErrorBoundary><Header /></ErrorBoundary>
        <Routes>                              
            <Route exact path="/perfil" element={<ErrorBoundary><PrivateRoute component={Profile} /></ErrorBoundary>} />
            <Route exact path="/registro" element={<ErrorBoundary><AuthRoute component={Register} /></ErrorBoundary>} />
            <Route exact path="/iniciar-sesion" element={<ErrorBoundary><AuthRoute component={Login} /></ErrorBoundary>} />
            <Route exact path="/carrito" element={<ErrorBoundary><PrivateRoute component={Cart} /></ErrorBoundary>} />
            <Route exact path="/success" element={<ErrorBoundary><Success /></ErrorBoundary>} />
            <Route exact path="/nosuccess" element={<ErrorBoundary><NoSuccess /></ErrorBoundary>} />
            <Route exact path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="*" element={<NotFound />} />          
          </Routes>
          <Footer />
        </Router>
      </ProductsState>
    </UserState>

  );
}

export default App;