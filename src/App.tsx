import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import News from './components/News/News.tsx';
import Music from './components/Music/Music.tsx';
import Settings from './components/Settings/Settings.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import Login from './components/Login/Login.tsx';
import React, { Suspense } from 'react';
import { initializeApp } from './redux/app-reducer.ts';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader.tsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/redux-store.ts';
import { UsersPage } from './components/Users/UsersContainer.tsx';

//ленивая подгрузка js для страниц ниже(ускоряет загрузку всего приложения и подгружает файлы по мере необходимости)
//import DialogsContainer from './components/Dialogs/DialogsContainer.tsx';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
//import ProfileContainer from './components/Profile/ProfileContainer.tsx';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));
//import UsersPage from './components/Users/UsersContainer.tsx';
//const UsersPage = React.lazy(() => import('./components/Users/UsersContainer.tsx'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  //обработчик глобальных ошибок
  catchAllUnhandlerErrors = (reason: PromiseRejectionEvent) => {
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
                <Route path='/' element={<Navigate to="/profile" />} />
                <Route path='/dialogs/*' element={<DialogsContainer />} />
                <Route path='/profile/:profileId?' element={<ProfileContainer />} />
                <Route path='/users' element={<UsersPage pageTitle={"Самурай"} />} />
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const AppMain: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default AppMain;