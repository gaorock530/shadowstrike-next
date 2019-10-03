import React from 'react'
import Head from 'next/head'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'
import apiList from '../data/jsApiList';
import {appId} from '../data/appId.json';
import cuid from 'cuid';
import BaomingForm from '../components/subpage/baoming_form';
import Confirm from '../components/subpage/confirm_page';
import Payment from '../components/subpage/payment';
import NotWeiXin from '../components/subpage/notWeixin';
import Status from '../components/subpage/status';

const icon_url = 'https://yingxitech.com/static/bisai/android-chrome-192x192.png';
const page = {
  pageTitle: '大赛报名通道',
  shareTitle: '报名通道',
  shareDesc: '中原青少年艺术赛事网，报名通道即将开启',
  shareLink: 'https://yingxitech.com/pay'
}

class Pay extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      status: '',
      loggedIN: false,
      user: null,
      api: '',
      stage: 0,
    }
  }

  static async getInitialProps({ req }) {
    const query = req ? req.query : null;
    return { query }
  }

  async componentDidMount() {

    // confirm if already has a race
    const raceStatus = await fetch('https://api.yingxitech.com/baoming/verify', {
      method: 'POST',
      body: JSON.stringify({openid: this.props.query.openid}),
      headers: {'Content-Type': 'application/json'}
    });

    this.raceJson = await raceStatus.json();

    if (!this.raceJson.err) this.setState({stage: 4});



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

      if (response.ok) console.log('api: /user');
      

    } else {

      if (!this.props.query.openid || this.props.query.openid === 'undefined') return; // !!!! Not Weixin access, Need spacial handle !!!!
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

      this.setState({user, loggedIN: user.openid});
      if (user.token) window.localStorage.setItem('token', user.token);
    } else {
      console.log('not from Weixin!!!')
    }

    try {
      await getConfig();
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.updateAppMessageShareData({ 
          title: page.shareTitle, // 分享标题
          desc: page.shareDesc, // 分享描述
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
          success: function () {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({ 
          title: page.shareTitle, // 分享标题
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
          success: function () {
            // 设置成功
          }
        })
      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    }catch(e) {
      console.log(e)
    }
  }

  onConfirm = (formData) => {
    console.log(formData)
    this.formData = formData;
    this.setState({stage: 1});
  }

  onSubmit = () => {
    this.setState({stage: 2});
  }

  onAfterPay = (status) => {
    console.log('after pay');
    this.setState({stage: 3, status});
  }
  

  render () {
    if(!this.props.query.openid || this.props.query.openid === 'undefined' || this.props.query.subscribe === '0') return <NotWeiXin/>

    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>{page.pageTitle}</title>
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
        </Head>
        <div className="relative_body padding-size">

          <h5>你好，{this.state.user?this.state.user.nickname: '朋友'}</h5>
          <h5>欢迎来到中原青少年艺术赛事网</h5>

          <div className="user-icon" style={{backgroundImage: `url(\'${this.state.user?this.state.user.pic:''}\')`}}></div>
          {this.props.query && this.props.query.subscribe === '0'?<h6>温馨提示：请先关注本公众号才能获得报名资格</h6>:
            <div>
              {this.state.stage === 0 && <BaomingForm openid={this.props.query.openid || 'oGCPOwwKLIZNVOa8TOqUOsdbDpLs'} onConfirm={this.onConfirm}/>}
              {this.state.stage === 1 && <Confirm openid={this.props.query.openid || 'oGCPOwwKLIZNVOa8TOqUOsdbDpLs'} onSubmit={this.onSubmit} formData={this.formData}/>}
              {this.state.stage === 2 && <Payment openid={this.props.query.openid || 'oGCPOwwKLIZNVOa8TOqUOsdbDpLs'} onSubmit={this.onAfterPay}/>}
              {this.state.stage === 3 && <div>{this.state.status}</div>}
              {this.state.stage === 4 && <Status statusData={this.raceJson} onSubmit={this.onAfterPay}/>}
            </div>
          }
        </div>
      </div>
    )
  }
}


export default Pay

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
  }catch(e) {
    return JSON.stringify({type: 'request error', error: e});
  }
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: apiList // 必填，需要使用的JS接口列表
  });
  return 'config finished:' + JSON.stringify(data);
}
