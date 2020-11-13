import React from 'react';
import {Layout} from 'antd';
import PropTypes from 'prop-types';

import FooterComponent from './footer';
import HeaderComponent from './header';

import "./layout.css"

const {Content} = Layout;

const LayoutComponent = (props) => {
    return (
        <Layout className="layout">
            <HeaderComponent/>
            <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <FooterComponent/>
        </Layout>
    )
}
LayoutComponent.propTypes = {
    children: PropTypes.node.isRequired
}
export default React.memo(LayoutComponent);