import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { Routes, Route } from 'react-router-dom';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar state={props.state.sidebarFriends}/>
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs/*' element={<Dialogs state={props.state.dialogsPage} />} />
            <Route path='/profile' element={<Profile posts={props.state.profilePage} />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;