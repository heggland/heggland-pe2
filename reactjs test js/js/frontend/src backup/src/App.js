import "./App.css";

import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";

import Home from "./pages/home/home";
import Hotels from "./pages/hotels/hotels";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import Contact from "./pages/contact/contact";
import Details from "./pages/details/details";

export default function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Router>
          <Navigation />
          <Container className="my-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/hotels" exact component={Hotels} />
              <Route path="/hotels/:id" exact component={Details} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Container>
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}
