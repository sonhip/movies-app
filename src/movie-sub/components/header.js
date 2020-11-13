import React from 'react';
import {Layout, Menu} from 'antd';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import * as api from '../services/login';


const {Header} = Layout;

const HeaderComponent = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const infoUser = api.decodeTokenFromLocalStorage();
    const history = useHistory();
   

    const logout = () => {
        if(infoUser !== null) {
            api.removeTokenLocalStorage();
            history.push('/login')
        }
    }

    return(
        <Header className="header">
            <NavLink to='/'>
                <div className="logo" />
            </NavLink>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
                <Menu.Item key="/home">
                    <NavLink to='/home' >Home</NavLink>
                </Menu.Item>
                <Menu.Item key="/new-movies">
                    <NavLink to='/new-movies' >New Movies</NavLink>
                </Menu.Item>
                <Menu.Item key="/search-movie">
                    <NavLink to='/search-movie'>Search Movies</NavLink>
                </Menu.Item>
                {infoUser === null && (
                    <Menu.Item  key='/login'>
                        <NavLink to='/login'>Login</NavLink>
                    </Menu.Item>
                )} 
               
                <Menu.Item >
                    <strong>
                        {infoUser !==undefined ? `Hi, ${infoUser.username}` : null}
                    </strong>
                </Menu.Item>
                
                {infoUser !== null && (
                    <Menu.Item>
                     <span onClick={() =>logout()} >Logout</span>
                    </Menu.Item>
                )} 
            
            </Menu>
      </Header>
    )
}
 
export default React.memo(HeaderComponent);