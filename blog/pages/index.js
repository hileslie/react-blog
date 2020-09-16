import React , { useState } from 'react';
import Head from 'next/head';
import {Row, Col, List, Icon} from 'antd';
import Header from '../components/Header'
import '../static/style/pages/index.less'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
const Home = () => {

	const [myList, setMyList] = useState(
		[
			{
				title: '1xx',
				context: '1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			},
			{
				title: '2xx',
				context: '2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			},
			{
				title: '3xx',
				context: '3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			}
		]
	) 

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Header></Header>
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={myList}
						renderItem={(item) => (
							<List.Item>
								<div className="list-title">{item.title}</div>
								<div className="list-icon">
									<span><Icon type="" /> 2020-20-20 </span>
									<span><Icon type="" /> 视频教程 </span>
									<span><Icon type="fire" /> 666人 </span>
								</div>
								<div className="list-context">{item.context}</div>
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

export default Home;