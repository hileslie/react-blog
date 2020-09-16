import React from 'react';
import '../static/style/components/header.less';
import { Row,Col, Menu, Icon } from 'antd'
const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col  xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">Hi</span>
                <span className="header-txt">Leslie</span>
            </Col>
    
            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu  mode="horizontal">
                    <Menu.Item key="home">
                        <Icon type="home" />
                        首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <Icon type="youtube" />
                        xx
                    </Menu.Item>
                    <Menu.Item key="life">
                        <Icon type="smile" />
                        xxx
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)
  
export default Header