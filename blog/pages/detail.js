import React from 'react';
import Head from 'next/head';
import { Row, Col, Icon, Breadcrumb, Affix} from 'antd';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detail.less'
import axios from 'axios';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from  '../components/tocify.tsx';

import servicePath from '../pages/api/api_url'

const Detail = (details) => {
	const tocify = new Tocify();
	const renderer = new marked.Renderer();

	renderer.heading = function(text, level, raw) {
		const anchor = tocify.add(text, level);
		return `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
					<h${level}>${text}</h${level}>
				</a>\n`
	}

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
	let html = marked(details.article_content)
	return (
		<>
			<Head>
				<title>{details.title}</title>
			</Head>
			<Header></Header>
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
							<Breadcrumb.Item><a href={'/list?id=' + details.type_id}>{details.type_name}</a></Breadcrumb.Item>
							<Breadcrumb.Item>{details.title}</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<div>
						<div className="detail-title">
							{details.title}
						</div>
						<div className="list-icon center">
								<span><Icon type="calendar" />{details.add_time}</span>
								<span><Icon type="folder" />{details.type_name}</span>
								<span><Icon type="fire" />{details.view_count}</span>
						</div>
						<div className="detail-content"
							dangerouslySetInnerHTML={{__html: html}}
						>
						</div>
					</div>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author></Author>
					<Advert></Advert>
					<Affix offsetTop={5}>
						<div className="detail-nav comm-box">
							<div className="nav-title">
								文章目录
							</div>
							{tocify && tocify.render()}
						</div>
					</Affix>
				</Col>
			</Row>
			<Footer></Footer>
		</>
	)
}

Detail.getInitialProps = async(context) => {
	let id = context.query.id;
	const promise = new Promise((resolve) => {
		axios(servicePath.getArticleDetailById + id).then((res) => {
			resolve(res.data.data[0]);
		})
	})
	return await promise
}

export default Detail;