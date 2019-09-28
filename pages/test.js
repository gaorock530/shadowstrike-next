import React from 'react'
import Head from 'next/head'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'
import apiList from '../data/jsApiList';
import {appId} from '../data/appId.json';
import cuid from 'cuid';


class Test extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      localStorage: false,
      status: ''
    }
  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    return { query, userAgent }
  }

  async componentDidMount() {
    if (window && window.localStorage) this.setState({localStorage: true});
    this.setState({status: 'componentDidMount'});
    try {
      const res = await getConfig();
      this.setState({status: res});
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.updateAppMessageShareData({ 
          title: '报名通道', // 分享标题
          desc: '中原青少年艺术赛事网，报名通道即将开启', // 分享描述
          link: 'https://yingxitech.com/baoming', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://yingxitech.com/static/bisai/android-chrome-192x192.png', // 分享图标
          success: function () {
            // 设置成功
            this.setState({status: 'updateAppMessageShareData ok'});
          }
        });
        wx.updateTimelineShareData({ 
          title: '报名通道', // 分享标题
          link: 'https://yingxitech.com/baoming', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://yingxitech.com/static/bisai/android-chrome-192x192.png', // 分享图标
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
          <title>测试页面</title>
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
        </Head>
        <div className="relative_body">
          <h5>你好</h5>
          {/* <Link href="/test"></Link> */}
          <p>{JSON.stringify(this.props.query)}</p>
          <p>{JSON.stringify(this.props.userAgent)}</p>
          <p>localStorage: {this.state.localStorage?'支持':'不支持'}</p>
          <p>{this.state.status}</p>
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
      body: {
        timestamp,
        noncestr
      }
    });
    data = await res.json();;
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
