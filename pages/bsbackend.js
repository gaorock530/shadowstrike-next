import React from 'react'
import Head from 'next/head'
import '../styles/backend.scss';
import Meta from '../components/bisaiMeta';
import Nav from '../components/webbackend/nav';
import Body from '../components/webbackend/body';



class BsBackend extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      nav: 0
    }
  }

  static async getInitialProps({ req }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    const user = req? req.user : null;
    return { query, user }
  }

  async componentDidMount () {
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx09fc8bca51c925c7&redirect_uri=https%3A%2F%2Fapi.yingxitech.com%2Fwxlogin%3Ftype%3Dbaoming&response_type=code&scope=snsapi_userinfo&state=baoming#wechat_redirect
    try {
      console.log('query:', this.props.query);
      console.log('query:', this.props.user);
    }catch(e) {
      console.log(e)
    }
  }

  render () {
    return (
      <div className="backend_body">
        <Meta/>
        <Head>
          <title>管理后台页面</title>
        </Head>
        <Nav onChangeNav={(index) => this.setState({nav: index})} active={this.state.nav}/>
        <div className="backend_main">
          <Body navIndex={this.state.nav}/>
        </div>
        
        
      </div>
    )
  }
}


export default BsBackend;

