import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Container from "react-bootstrap/Container";

import background from "./assets/Website Photos/website-background.jpg";

import MainNav from "./components/MainNav";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SponsorUs from "./pages/SponsorPage";
import OurPurpose from "./pages/OurPurpose";
import MessageToParents from "./pages/MessageToParents";
import ContactUs from "./pages/ContactUs";
import Saftey from "./pages/Saftey";
import OurVision from "./pages/OurVision";
import HeadCoaches from "./pages/HeadCoaches";
import Admin from "./pages/Admin";
import LoginForm from "./pages/Login";
import Signup from "./pages/Signup";
import LeaguePage from "./pages/LeaguePage";
import NotFound from "./pages/NotFound";
import AddAnnounce from "./pages/AddAnnounce";
import AddLeague from "./pages/AddLeague";
import AddMember from "./pages/AddMember";
import Footer from "./components/Footer";
import Donate from "./pages/Donate";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "include",
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

const clientLink = authLink.concat(httpLink);

const link = ApolloLink.from([errorLink, clientLink]);

const client = new ApolloClient({
  link,
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <div>
          <Container>
            <Router>
              <Header />
              <MainNav />
              <div>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sponsor" element={<SponsorUs />} />
                  <Route path="/our-purpose" element={<OurPurpose />} />
                  <Route path="/donate" element={<Donate/>}/>
                  <Route
                    path="/message-to-parents"
                    element={<MessageToParents />}
                  />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/our-vision" element={<OurVision />} />
                  <Route path="/saftey" element={<Saftey />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/head-coaches" element={<HeadCoaches />} />
                  <Route path="/teams" element={<LeaguePage />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route
                    path="/admin/add-announcement"
                    element={<AddAnnounce />}
                  />
                  <Route path="/admin/add-league" element={<AddLeague />} />
                  <Route path="/admin/add-member" element={<AddMember />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </Container>
        </div>
        <Footer/>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
