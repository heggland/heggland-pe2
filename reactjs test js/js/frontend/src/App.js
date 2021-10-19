import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Hotels from "./pages/hotels/hotels";
import Post from "./pages/post/Post";
import Contact from "./pages/contact/contact";

// admin paths
import AdminPage from "./pages/admin/AdminPage";
import AddPost from "./pages/admin/posts/AddPost";
import EditPost from "./pages/admin/posts/EditPost";
import PreviewPost from "./pages/admin/posts/PreviewPost";

export default function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Router>
          <Navigation />

          <Container className="my-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/posts/:id" exact component={Post} />
              <Route path="/contact" component={Contact} />
              <Route path="/hotels" component={Hotels} />
              <Route path="/login" component={Login} />
              <Route path="/admin" exact component={AdminPage} />
              <Route path="/admin/new" component={AddPost} />
              <Route path="/admin/edit/:id" component={EditPost} />
              <Route path="/admin/draft/:id" component={PreviewPost} />
            </Switch>
          </Container>
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}
