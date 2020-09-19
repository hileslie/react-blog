import React , { useState, useEffect } from 'react';
import Head from 'next/head';
import {Row, Col, List, Icon, Breadcrumb} from 'antd';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios';
import servicePath from './api/api_url'
import Link from 'next/link';
import '../static/style/pages/list.less'
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
const ListPage = (list) => {
	const renderer = new marked.Renderer();
	marked.setOptions({
		renderer: renderer,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value;
		}
	})
	const [myList, setMyList] = useState(list.data)
	useEffect(() => {
		setMyList(list.data)
	})
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Header></Header>
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
							<Breadcrumb.Item>{myList[0] ? myList[0].type_name : '/'}</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={myList}
						renderItem={(item) => (
							<List.Item>
								<div className="list-title">
									<Link href={{pathname:'/detail', query: {id: item.id}}}>
										<a>{item.title}</a>
									</Link>
								</div>
								<div className="list-icon">
									<span><Icon type="calendar" />{item.add_time}</span>
									<span><Icon type="folder" />{item.type_name}</span>
									<span><Icon type="fire" />{item.view_count}</span>
								</div>
								<div className="list-context"
									dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
								></div>
							</List.Item>
						)}
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author></Author>
					<Advert></Advert>
				</Col>
			</Row>
			<Footer></Footer>
		</>
	)
}

ListPage.getInitialProps = async (context) => {
	let id = context.query.id;
	const promise = new Promise((resolve) => {
		axios(servicePath.getArticleListById + id).then((res) => {
			resolve(res.data);
		})
	})

	return await promise
}
export default ListPage;