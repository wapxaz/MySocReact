import './App.css';
import News from './components/News/News.tsx';
import Music from './components/Music/Music.tsx';
import Settings from './components/Settings/Settings.tsx';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { LoginPage } from './components/Login/Login.tsx';
import React, { Suspense, useEffect } from 'react';
import { initializeApp } from './redux/app-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader.tsx';
import { AppDispatch, AppStateType } from './redux/redux-store.ts';
import { UsersPage } from './components/Users/UsersContainer.tsx';
import { ProfilePage } from './components/Profile/ProfileContainer.tsx';
import { MessageOutlined, DesktopOutlined, UserOutlined, ControlOutlined, CustomerServiceOutlined, ReadOutlined, WechatOutlined } from '@ant-design/icons';
import type { GetProp, MenuProps } from 'antd';
import { Col, Layout, Menu, Row, theme } from 'antd';
import Block3FriendsContainer from './components/Navbar/Block3Friends/Block3FriendsContainer.tsx';
import { Header } from './components/Header/Header.tsx';
//import { ChatPage } from './components/pages/ChatPage.tsx';

const { Content, Footer, Sider } = Layout;

type MenuItem = GetProp<MenuProps, 'items'>[number];
//формирую левое меню
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const itemsLeftMenu: MenuItem[] = [
  getItem('Profile', 'allProfile', <UserOutlined />, [
    getItem(
      <Link to="/profile">Profile</Link>,
      'profile',
      <UserOutlined />,
    ),
    getItem(
      <Link to="/dialogs">Messages</Link>,
      'dialogs',
      <MessageOutlined />,
    ),
  ]),
  getItem(
    <Link to="/users">Developers</Link>,
    'users',
    <DesktopOutlined />,
  ),
  getItem(
    <Link to="/chat">Chat</Link>,
    'chat',
    <WechatOutlined />,
  ),
  getItem(
    <Link to="/news">News</Link>,
    'news',
    <ReadOutlined />,
  ),
  getItem(
    <Link to="/music">Music</Link>,
    'music',
    <CustomerServiceOutlined />,
  ),
  getItem(
    <Link to="/settings">Settings</Link>,
    'settings',
    <ControlOutlined />,
  ),
];

//ленивая подгрузка js для страниц ниже(ускоряет загрузку всего приложения и подгружает файлы по мере необходимости)
//import DialogsContainer from './components/Dialogs/DialogsContainer.tsx';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const ChatPage = React.lazy(() => import('./components/pages/Chat/ChatPage.tsx'));
//import ProfileContainer from './components/Profile/ProfileContainer.tsx';
//const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));
//import UsersPage from './components/Users/UsersContainer.tsx';
//const UsersPage = React.lazy(() => import('./components/Users/UsersContainer.tsx'));



const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
    //window.addEventListener("unhandledrejection", this.catchAllUnhandlerErrors);
    //window.removeEventListener("unhandledrejection", this.catchAllUnhandlerErrors);
  }, []);

  //обработчик глобальных ошибок
  const catchAllUnhandlerErrors = (reason: PromiseRejectionEvent) => {
    console.log("Тут обработчик глобальной ошибки - например всплывающая форма на несколько секунд");
    console.error(reason);
  }

  if (!initialized) {
    return (
      <Preloader />
    );
  } else {
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 48px' }}>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>*/}
          <Layout
            style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="vertical"
                defaultSelectedKeys={['allProfile']}
                // defaultOpenKeys={['allProfile']}
                // style={{ height: '80%' }}
                items={itemsLeftMenu}
              />
              <Row style={{padding: "15px"}}>
                <Row><h4>Friends</h4></Row>
                <Row>
                  <Block3FriendsContainer />
                </Row>
              </Row>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<div><Preloader /></div>}>
                <Routes>
                  <Route path='/' element={<Navigate to="/profile" />} />
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/profile/:profileId?' element={<ProfilePage />} />
                  <Route path='/users' element={<UsersPage pageTitle={"Самурай"} />} />
                  <Route path='/news' element={<News />} />
                  <Route path='/music' element={<Music />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='*' element={<div>404 NOT FOUND</div>} />
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Sukaloff ©{new Date().getFullYear()} Created by Sukalov E.V.
        </Footer>
      </Layout>
    );
  }
}
export default App;