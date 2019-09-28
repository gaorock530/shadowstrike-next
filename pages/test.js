import React from 'react'
import Head from 'next/head'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'
import apiList from '../data/jsApiList';
import {appId} from '../data/appId.json';
import cuid from 'cuid';
import BaomingForm from '../components/subpage/baoming_form';


const icon_url = 'https://yingxitech.com/static/bisai/android-chrome-192x192.png';
const page = {
  pageTitle: '测试页面',
  shareTitle: '报名通道',
  shareDesc: '中原青少年艺术赛事网，报名通道即将开启',
  shareLink: 'https://yingxitech.com/test'
}

class Test extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      status: '空',
      loggedIN: false,
      user: null,
      api: ''
    }
  }

  static async getInitialProps({ req }) {
    const query = req ? req.query : null;
    return { query }
  }

  async componentDidMount() {
    // check is New USER with Token
    let user, response;
    if (this.props.query.token && this.props.query.token !== 'undefined') {
      window.localStorage.setItem('token', this.props.query.token);

      response = await fetch('https://api.yingxitech.com/user', {
        method: 'POST',
        body: JSON.stringify({openid: this.props.query.openid}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) this.setState({api: '/user'});
      

    } else {

      if (!this.props.query.openid) return console.log('no openid!!'); // !!!! Not Weixin access, Need spacial handle !!!!
      // check if already logged in
      const token = window.localStorage? window.localStorage.getItem('token'): null;
      

      if (token && token !== 'undefined') {

        response = await fetch('https://api.yingxitech.com/login', {
          method: 'POST',
          body: JSON.stringify({token}),
          headers: {
            'Content-Type': 'application/json'
          }
        });


      } else {
        window.localStorage.removeItem('token');

        response = await fetch('https://api.yingxitech.com/login', {
          method: 'POST',
          body: JSON.stringify({
            openid: this.props.query.openid
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
    if (response.ok) {
      user = await response.json();
      console.log(user)

      this.setState({user: !user.user, loggedIN: !user.user});
      if (user.token) window.localStorage.setItem('token', user.token);
    } else {
      this.setState({status: 'not from Weixin!!!'});
    }

    this.setState({status: 'componentDidMount'});
    try {
      const res = await getConfig();
      this.setState({status: res});
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.updateAppMessageShareData({ 
          title: page.shareTitle, // 分享标题
          desc: page.shareDesc, // 分享描述
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
          success: function () {
            // 设置成功
            this.setState({status: 'updateAppMessageShareData ok'});
          }
        });
        wx.updateTimelineShareData({ 
          title: page.shareTitle, // 分享标题
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
          success: function () {
            // 设置成功
            this.setState({status: 'updateTimelineShareData ok'});
          }
        })
      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        this.setState({status: JSON.stringify({type: 'config error', error: res})});
      });
    }catch(e) {
      console.log(e)
      this.setState({status: JSON.stringify({type: 'setup error', error: e})});
      
    }
  }

  

  render () {
    

    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>{page.pageTitle}</title>
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
        </Head>
        <div className="relative_body padding-size">

          <h5>你好，{this.props.query?this.props.query.nickname: '朋友'}</h5>
          <h5>欢迎来到中原青少年艺术赛事网</h5>

          <div className="user-icon" style={{backgroundImage: `url('${(this.props.query && this.props.query.pic) || '/static/pic/back.jpeg'}')`}}></div>
          <h2>报名通道将在10月1日开启</h2>
          {this.props.query && this.props.query.subscribe === '1'?null:<h6>温馨提示：请先关注本公众号才能获得报名资格</h6>}
          <a className="test_link" href={`/test?openid=${this.props.query.openid}&token=${this.props.query.token}`}></a>
          
          <p>{JSON.stringify(this.props.query)}</p>
          <p>user: {JSON.stringify(this.state.user)}</p>
          <p>是否已登录：{this.state.loggedIN? '是': '否'}</p>
          <p>{this.state.status}</p>
          <p>{JSON.stringify(this.state.api)}</p>
          <BaomingForm/>
        </div>
      </div>
    )
  }
}


export default Test

async function getConfig () {
  let data;
  const timestamp = Date.now();
  const noncestr = cuid();
  try {
    const res = await fetch('https://api.yingxitech.com/wxconfig', {
      method: 'POST',
      body: JSON.stringify({
        timestamp,
        noncestr,
        url: window.location.href
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    data = await res.json();
    console.log(data);
  }catch(e) {
    return JSON.stringify({type: 'request error', error: e});
  }
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: apiList // 必填，需要使用的JS接口列表
  });
  return 'config finished:' + JSON.stringify(data);
}
