import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainPage from './pages/mainPage';
import UserPage from './pages/UserPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">

              <MainPage />
            </Route>
            <Route exact path="/users/:id">

              <UserPage userId="60da14b884d077455f0c8c1e" />
            </Route>

          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
