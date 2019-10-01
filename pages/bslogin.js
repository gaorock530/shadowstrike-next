import React from 'react'
import Head from 'next/head'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'


class BsLogin extends React.PureComponent {
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
    //https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect
    
    try {
      var obj = new WxLogin({
        self_redirect:false,
        id:"qr_code", 
        appid: "wxb751a892b92c78f8", 
        scope: "snsapi_login", 
        redirect_uri: encodeURI(`https://api.yingxitech.com/authlogin/webpage`),
        state: "login",
        style: "white",
      });
    }catch(e) {
      console.log(e)
      
    }
  }

  render () {
    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>管理后台登录</title>
          <script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
        </Head>
        <div className="relative_body">
          <div id="qr_code"></div>
        </div>
        
        
      </div>
    )
  }
}


export default BsLogin;

