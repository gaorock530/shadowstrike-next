import React from 'react'
import Head from 'next/head'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'



class BsBackend extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      status: ''
    }
  }

  static async getInitialProps({ req }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    return { query }
  }

  async componentDidMount () {
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx09fc8bca51c925c7&redirect_uri=https%3A%2F%2Fapi.yingxitech.com%2Fwxlogin%3Ftype%3Dbaoming&response_type=code&scope=snsapi_userinfo&state=baoming#wechat_redirect
    try {
      console.log('query:', this.props.query);
    }catch(e) {
      console.log(e)
      
    }
  }

  render () {
    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>管理后台页面</title>
        </Head>
        <div className="relative_body">
          <div>{JSON.stringify(this.props.query)}</div>
        </div>
        
        
      </div>
    )
  }
}


export default BsBackend;

