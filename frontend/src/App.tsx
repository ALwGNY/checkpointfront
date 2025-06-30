import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage} from "./pages/Home";
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CountryPage } from "./pages/Country";


const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/country/:code" Component={CountryPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
