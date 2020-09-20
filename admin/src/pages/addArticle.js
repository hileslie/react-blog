import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/style/addArticle.scss";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from 'axios';
import servicePath from '../api/api_url';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   // 文章标题
    const [articleContent , setArticleContent] = useState('')  // markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') // html内容
    const [introducemd,setIntroducemd] = useState()            // 简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') // 简介的html内容
    const [showDate,setShowDate] = useState()   // 发布日期
    const [updateDate,setUpdateDate] = useState() // 修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别

    useEffect(() => {
        getTypeInfo();
    }, [])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true,
        }).then(res => {
            if (res.data.data === '未登录') {
                localStorage.removeItem('openId');
                props.history.push('/');
            } else {
                setTypeInfo(res.data.data);
            }
        })
    }

    const selelctTypeHandler = (val) => {
        setSelectType(val)
    }

    const saveArticle = () => {
        if (!selectedType || selectedType === '请选择类型') {
            message.error('请选择文章类型');
            return false;
        }
        if (!articleTitle) {
            message.error('请输入文章标题');
            return false;
        }
        if (!articleContent) {
            message.error('请输入文章内容');
            return false;
        }
        if (!introducemd) {
            message.error('请输入文章简介');
            return false;
        }
        if (!showDate) {
            message.error('请选择发布日期');
            return false;
        }
        let data = {};
        data.type_id = selectedType;
        data.title = articleTitle;
        data.article_content = articleContent;
        data.introduce = introducemd;
        let dateText = showDate.replace('-', '/');
        data.add_time = (new Date(dateText).getTime()) / 1000;

        if (articleId === 0) {
            data.view_count = 0;
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data,
                withCredentials: true,
            }).then((res) => {
                if (res.data.success) {
                    message.success('发布成功');
                    setArticleId(res.data.insertId);
                } else {
                    message.error('发布失败')
                }
            })
        } else {
            data.id = articleId;
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data,
                withCredentials: true,
            }).then((res) => {
                if (res.data.success) {
                    message.success('修改成功');
                } else {
                    message.error('修改失败')
                }
            })

        }
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={(e) => {setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                defaultValue={selectedType}
                                size="large"
                                onChange={selelctTypeHandler}
                            >
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option value={item.Id} key={index}>{item.type_name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html: markdownContent}}
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea 
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{__html: introducehtml}}
                            ></div>
                        </Col>
                        <Col span={24}>
                            <div className="date-select">
                                <DatePicker 
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => {setShowDate(dateString)}}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default AddArticle;
