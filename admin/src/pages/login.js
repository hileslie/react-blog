import React, { useState} from 'react';
import {Card, Input, Button, Spin, message} from 'antd';
import { UserOutlined , KeyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../static/style/login.scss';
import servicePath from '../api/api_url';
import axios from 'axios';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const checkLogin = () => {
        if (!userName) {
            message.error('用户名不能为空');
            return false;
        } else if (!password) {
            message.error('密码不能为空');
            return false;
        }
        setIsLoading(true)
        let data = {
            userName,
            password,
        }

        axios({
            method: 'POST',
            url: servicePath.checkLogin,
            data,
            withCredentials: true,
        }).then((res) => {
            setIsLoading(false)
            if (res.data.data === '登陆成功') {
                localStorage.setItem('openId', res.data.openId);
                props.history.push('/index')
            } else {
                message.error('用户名密码错误');
            }
        }).catch(error => {
            console.error(error)
            setTimeout(() => {
                setIsLoading(false);
                message.error('服务器不稳定了');
            }, 1000)
        })
    }

    return (
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading}>
                <Card
                    title="Leslie"
                    bordered={true}
                    style={{width: 400}}
                >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter Your UserName"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter Your UserName"
                        prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;