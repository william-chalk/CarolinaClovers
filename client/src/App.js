import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Container from "react-bootstrap/Container";

import MainNav from "./components/MainNav";
import HomePage from "./pages/HomePage";
import SponsorUs from "./pages/SponsorPage";
import OurPurpose from "./pages/OurPurpose";
import MessageToParents from "./pages/MessageToParents";
import ContactUs from "./pages/ContactUs";
import Saftey from "./pages/Saftey";
import OurVision from './pages/OurVision';
import HeadCoaches from "./pages/HeadCoaches";
import Admin from "./pages/Admin";

const httpLink = createHttpLink({
  uri: "/graphql",
});
//TODO: need to update route to multi project view?
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Container>
        <Router>
          <div>
          <MainNav />
          <div>
          <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/sponsor" element={<SponsorUs/>}/>
          <Route path="/our-purpose" element={<OurPurpose/>}/>
          <Route path="/message-to-parents" element={<MessageToParents/>}/>
          <Route path="/our-vision" element={<OurVision/>}/>
          <Route path="/saftey" element={<Saftey/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/head-coaches" element={<HeadCoaches/>}/>
          <Route path="/admin" element={<Admin/>}/>
          </Routes>
          </div>
          </div>
        </Router>
        </Container>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
