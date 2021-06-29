import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="App" style={{ minHeight: '90vh' }}>
        <Router>
          <Switch>

            <Route exact path="/">
              <MainPage />
            </Route>

            <Route exact path={["/users/:id", "/me"]}>
              <UserPage />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/signup">
              <Signup />
            </Route>

          </Switch>
        </Router>
      </div>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
