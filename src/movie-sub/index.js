import React,{lazy, Suspense} from 'react';
import {Skeleton} from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import {isAuthenticated} from './services/login';

//   import HomeComponent from './pages/home';
//   import NewMoviesPage from './pages/new-movies';
//   import SearchMoviePage from './pages/search-movie';


  const HomeComponent = lazy(()=>import('./pages/home'));
  const NewMoviesPage = lazy(()=>import('./pages/new-movies'));
  const SearchMoviePage = lazy(()=>import('./pages/search-movie'));
  const DetailsMoviePage = lazy(()=>import('./pages/details'));
  const LoginComponent = lazy(()=>import('./pages/login'));


  const LoginRouter = ({children, ...rest}) => {
        const isLogin = isAuthenticated();
        return (
            <Route
                {...rest}
                render={({location}) => isLogin ? (
                    <Redirect
                        to={{
                            pathname :'/',
                            state: {from:location}
                        }}
                    />
                ) : (children)}
            />
        )
  }

  const PrivateRoute = ({children,...rest}) => {
        const auth  = isAuthenticated();
        return (
            <Route
                {...rest}
                render = {({location}) => auth ? (children) :(
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )}
            />
        )
  }

  const Movies = () =>{
      return (
        <Router>
            <Suspense fallback ={<Skeleton active />} >
                <Switch>
                    <PrivateRoute path="/home">
                        <HomeComponent />
                    </PrivateRoute>
                    <PrivateRoute path="/new-movies">
                        <NewMoviesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/search-movie">
                        <SearchMoviePage />
                    </PrivateRoute>
                    <PrivateRoute path="/movies/:slug~:id">
                        <DetailsMoviePage />
                    </PrivateRoute>
                    <LoginRouter extract path="/login">
                        <LoginComponent />
                    </LoginRouter>
                    <PrivateRoute extract path="/">
                        <HomeComponent />
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
      )
  }

  export default Movies;