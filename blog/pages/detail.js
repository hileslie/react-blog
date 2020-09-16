import React from 'react';
import Head from 'next/head';
import { Row, Col, Icon, Breadcrumb} from 'antd';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detail.less'
const Detail = () => (
	<>
		<Head>
			<title>Detail</title>
		</Head>
		<Header></Header>
		<Row className="comm-main" type="flex" justify="center">
			<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
				<div className="bread-div">
					<Breadcrumb>
						<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
						<Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
						<Breadcrumb.Item>文章xxx</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div>
					<div className="detail-title">
						xxx-title
					</div>
					<div className="list-icon center">
						<span><Icon type="calendar" />2020-20-20</span>
						<span><Icon type="folder" />视频</span>
						<span><Icon type="fire" />666</span>
					</div>
					<div className="detail-content"></div>
				</div>
			</Col>
			<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
				<Author></Author>
				<Advert></Advert>
			</Col>
		</Row>
		<Footer></Footer>
	</>
)

export default Detail;