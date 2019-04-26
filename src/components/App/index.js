import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import { SignInPage, HomePage, TagAdminPage, SignUpPage, CabinetPage } from '../pages';
import Logout from '../Logout';
import Preloader from '../../containers/Preloader';
import NewArticle from '../NewArticle';
import UpdateArticle from '../UpdateArticle';
import Article from '../../components/Article';
import Footer from '../../containers/Footer';

import '../../assets/css/uikit.css';
import '../../assets/css/uikit-rtl.css';

const App = () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  if (isLoading)
    return <Preloader />;

  return (
    <div className='uk-container'>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:value" exact component={Article} />
        <Route path="/logout" exact component={Logout} />

        <Route path="/signin" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/admin/newArticle" exact component={NewArticle} />
        <Route path="/admin/updateArticle/:value" exact component={UpdateArticle} />
        <Route path="/admin/tags" exact component={TagAdminPage} />

        <Route path="/cabinet" exact component={CabinetPage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
