import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import Login from './components/Login/Login.jsx';
import React, { Suspense } from 'react';
import { initializeApp } from './redux/app-reducer.ts';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store.js';

//ленивая подгрузка js для страниц ниже(ускоряет загрузку всего приложения и подгружает файлы по мере необходимости)
//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
//import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.jsx'));
//import UsersContainer from './components/Users/UsersContainer';
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.jsx'));

class App extends React.Component {
  //обработчик глобальных ошибок
  catchAllUnhandlerErrors = (reason, promise) => {
    console.log("Тут обработчик глобальной ошибки - например всплывающая форма на несколько секунд");
    console.error(reason);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandlerErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandlerErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else {
      return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Suspense fallback={<div><Preloader /></div>}>
              <Routes>
                <Route exact path='/' element={<Navigate to="/profile" />} />
                <Route path='/dialogs/*' element={<DialogsContainer />} />
                <Route path='/profile/:profileId?' element={<ProfileContainer />} />
                <Route path='/users' element={<UsersContainer />} />
                <Route path='/news' element={<News />} />
                <Route path='/music' element={<Music />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<div>404 NOT FOUND</div>} />
              </Routes>
            </Suspense>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const AppMain = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default AppMain;