import React, {useState, useEffect} from 'react';
import {List, Row, Col, Modal, message, Button} from 'antd';
import axios from 'axios';
import servicePath from '../api/api_url';
import '../static/style/articleList.scss';

const {confirm} = Modal;

function ArticleList(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
        }).then((res) => {
            setList(res.data.list)
        })
    }

    const delArticle = (id) => {
        confirm({
            title: '确认删除文章？',
            content: '文章删除后将无法恢复',
            onOk() {
                axios({
                    method: 'post',
                    url: servicePath.delArticle,
                    data: {
                        id,
                    },
                    withCredentials: true,
                }).then((res) => {
                    message.success('文章删除成功');
                    getList();
                })
            },
            onCancel() {
            }
        })
    }

    const updateArticle = (id, checked) => {
        props.history.push('/index/edit/' + id);
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}><b>标题</b></Col>
                        <Col span={4}><b>类别</b></Col>
                        <Col span={4}><b>发布时间</b></Col>
                        <Col span={4}><b>浏览量</b></Col>
                        <Col span={4}><b>操作</b></Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item) => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.type_name}
                            </Col>
                            <Col span={4}>
                                {item.add_time}
                            </Col>
                            <Col span={4}>
                                {item.view_count}    
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={() => {updateArticle(item.id)}}>修改</Button>&nbsp;
                                <Button onClick={() => {delArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}

export default ArticleList;