import "./App.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
      <div style={{ flex: "1 0 auto" }}>
        <Router>
          <div>
            <Navbar expand="lg" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Holidaze</Navbar.Brand>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="float-right"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Navigation />
                </Navbar.Collapse>
              </Container>
            </Navbar>

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
          </div>
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}
