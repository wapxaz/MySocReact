import React from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStateType } from '../../redux/redux-store';
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { logout } from '../../redux/auth-reducer.ts';

export const Header: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const login = useSelector((state: AppStateType) => state.auth.login);

    const dispatch: AppDispatch = useDispatch();

    const { Header } = Layout;

    return (
        <Header >
            <Row>
                <Col span={4}>
                    <div className="demo-logo" >
                        <img src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" />
                    </div>
                </Col>
                <Col span={14}></Col>

                {isAuth
                    ? <>
                        <Col xs={2} sm={2} md={1}>
                            <div style={{ color: 'white' }}>
                                <Avatar alt={login || ""} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            </div>
                        </Col>
                        <Col xs={4} sm={4} md={5}>
                            <Button danger size={'small'} onClick={() => { dispatch(logout()) }}>Log Out</Button>
                        </Col>
                    </ >
                    :
                    <Col span={6}>
                        <Button><Link to={'/login'}>Login</Link></Button>
                    </Col>
                }

            </Row>
        </Header>
    );
}