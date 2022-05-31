import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import LogIn from "./pages/Login";
import Cart from "./pages/Cart";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import ProductDetails from "./pages/ProductDetails";
import { setContext } from "@apollo/client/link/context";

const uploadLink = createUploadLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='bg-blue-50 min-h-screen flex flex-col justify-between'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/store/product/:id' element={<ProductDetails />} />
            <Route path='/store/category/:id' element={<Store />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
