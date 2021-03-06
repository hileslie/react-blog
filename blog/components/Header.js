import React, {useState, useEffect} from 'react';
import '../static/style/components/header.less';
import { Row,Col, Menu, Icon } from 'antd';
import Router from 'next/router';
import axios from 'axios';

import servicePath from '../pages/api/api_url';

const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const result = async () => {
            const resp = await axios(servicePath.getTypeInfo).then((res) => {
                return res.data.data
            })
            setNavArray(resp)
        }
        result();
    }, [])

    const handleClick = (e) => {
        if(+e.key === 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center" align="middle">
                <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Hi Leslie</span>
                    <span className="header-txt"></span>
                </Col>
        
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.icon} />
                                        {item.type_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
  
export default Header