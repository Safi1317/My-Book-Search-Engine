import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  HttpLink
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
const httpLink = createHttpLink({ uri: "/graphql" })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : ""
    }
  }
})
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql'
  }),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<SearchBooks />}
            />
            <Route
              path='/saved'
              element={<SavedBooks />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
