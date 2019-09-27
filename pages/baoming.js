import React from 'react'
import Head from 'next/head'
import Body from '../components/body'
import '../styles/baoming.scss'


class Baoming extends React.PureComponent {

  static async getInitialProps({ req }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    return { query }
  }

  render () {
    return (
      <div className="baoming_body">
        <Head>
          <title>报名通道</title>
          <meta name="description" content="中原青少年艺术赛事网"/>
          <meta name="keywords" content="中原青少年艺术赛事网 中原 青少年 艺术 赛事" />
        </Head>
        <div className="relative_body">
          <h5>你好，{this.props.query.nickname}</h5>
          <h5>欢迎来到中原青少年艺术赛事网</h5>

          <div className="user-icon" style={{backgroundImage: `url('${this.props.query.pic || '/static/pic/back.jpeg'}')`}}></div>
          <h2>报名通道将在10月1日开启</h2>
          {this.props.query.subscribe === '1'?null:<h6>温馨提示：请先关注本公众号才能获得报名资格</h6>}
        </div>
        
        
      </div>
    )
  }
}


export default Baoming
