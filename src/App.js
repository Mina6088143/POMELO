import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Articles from './components/detail';
import Search from './components/search';
import TopStories from './components/TopStories';
import { Route, Switch, NavLink, BrowserRouter } from "react-router-dom";
import NavBar from './components/navBar';
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
      const getArticles = async () => {
          setLoading(true);
          const res = await axios.get(` https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=source:("The New York Times")&sort=newest&api-key=D6scj6AKAafGq90E0H0NGfrPEeozDS3M`);
          setArticles(res.data.response.docs);

          setLoading(false);
      };
      getArticles();

  }, []);

  const searchArticles = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=D6scj6AKAafGq90E0H0NGfrPEeozDS3M`);
    setArticles(res.data.response.docs);
    setLoading(false);
  };

  const getTopArticles = async (section) => {
    setLoading(true);
    const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=D6scj6AKAafGq90E0H0NGfrPEeozDS3M`);
    setTopStories(res.data.results);
    setLoading(false);
  };

  return (
    <div>
    <NavBar />
    <Container>
      <Typography color="textPrimary" gutterBottom variant="h2" align="center">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <>
              <Search searchArticles={searchArticles} />
              <NavLink to="/topstories">
                <Link component="button" variant="body2">Go to top stories in World, Tech and U.S</Link>
              </NavLink>
              <Articles loading={loading} articles={articles} />
            </>
          )} />

          <Route exact path="/topstories" render={() => (
            <>
              <TopStories loading={loading} topStories={topStories} getTopArticles={getTopArticles} />
            </>
          )} />

        </Switch>
        </BrowserRouter>
      </Typography>
    </Container>
  </div>
);
};

export default App;