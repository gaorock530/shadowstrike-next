import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Body from '../components/body'
import '../styles/style.scss';
import '../styles/index.scss';
import Meta from '../components/meta'




const Home = () => (
  <div>
    <Meta/>
    <Head>
      <title>影袭科技</title>
      <meta name="description" content="影袭网络技术有限公司 影袭 影袭科技 影袭网络 shadow strike 网络 PWA SPA 去中心化网络 http2"/>
      <meta name="keywords" content="影袭网络技术有限公司 影袭 影袭科技 影袭网络 shadow strike 网络 PWA SPA 去中心化网络 http2" />
    </Head>

    <Nav />
    <Body>
      <div className="top-content">
        <div className="back-img top1"></div>
        <div className="back-content">
          <h1>Artificial Neural Networks</h1>
          <h1>Decentralized Web Structure</h1>
          <p>人工神经网络（Artificial Neural Networks，简写为ANNs）也简称为神经网络（NNs）或称作连接模型（Connection Model），它是一种模仿动物神经网络行为特征，进行分布式并行信息处理的算法数学模型。这种网络依靠系统的复杂程度，通过调整内部大量节点之间相互连接的关系，从而达到处理信息的目的。</p>
          <p>在机器学习和相关领域，人工神经网络（人工神经网络）的计算模型灵感来自动物的中枢神经系统（尤其是脑），并且被用于估计或可以依赖于大量的输入和一般的未知近似函数。人工神经网络通常呈现为相互连接的“神经元”，它可以从输入的计算值，并且能够机器学习以及模式识别由于它们的自适应性质的系统。</p>
        </div>
      </div>
      <div className="top-content">
        <div className="back-img top2"></div>
        <div className="back-content">
          <h1>Professional Website Build</h1>
          <h1>专业网站建设</h1>
          <p>网站建设、微信开发、小程序开发、微信运营托管、并有朋友圈广告、数字营销等全新服务内容让企业微信不止有关注度，更有内容精度</p>
          <p>我们的核心技术引擎，面向地产、汽车出行、家电家装、金融等行业，提供软件开发、APP开发等解决方案。</p>
          <button>预付订金</button>
        </div>
      </div>
      
    </Body>
    <Footer/>
    
  </div>
)

export default Home
