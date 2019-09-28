import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'


class Baoming extends React.PureComponent {

  static async getInitialProps({ req }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    return { query }
  }

  render () {
    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>报名通道</title>
        </Head>
        <div className="relative_body">
          <h5>你好，{this.props.query?this.props.query.nickname: '朋友'}</h5>
          <h5>欢迎来到中原青少年艺术赛事网</h5>

          <div className="user-icon" style={{backgroundImage: `url('${(this.props.query && this.props.query.pic) || '/static/pic/back.jpeg'}')`}}></div>
          <h2>报名通道将在10月1日开启</h2>
          {this.props.query && this.props.query.subscribe === '1'?null:<h6>温馨提示：请先关注本公众号才能获得报名资格</h6>}
          <a className="test_link" href="/test?a=1"></a>
          {/* <Link href={{ pathname: '/test', query: { name: 'Zeit' } }} passHref><a className="test_link"></a></Link> */}
        </div>
        
        
      </div>
    )
  }
}


export default Baoming
