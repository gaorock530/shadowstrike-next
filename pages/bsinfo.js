import React from 'react'
import Head from 'next/head'
import '../styles/bsinfo.scss'
import Meta from '../components/bisaiMeta'
import apiList from '../data/jsApiList';
import {appId} from '../data/appId.json';
import cuid from 'cuid';


const icon_url = 'https://yingxitech.com/static/bisai/android-chrome-192x192.png';
const page = {
  pageTitle: '大赛报名通道',
  shareTitle: '报名通道',
  shareDesc: '寒假全国各大青少年艺术比赛开始报名了！',
  shareLink: 'https://yingxitech.com/bsinfo'
}

class BSinfo extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      status: '',
      
    }
  }

  static async getInitialProps({ req }) {
    const query = req ? req.query : null;
    return { query }
  }

  async componentDidMount() {
    try {
      await getConfig();
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.updateAppMessageShareData({ 
          title: page.shareTitle, // 分享标题
          desc: page.shareDesc, // 分享描述
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
        });
        wx.updateTimelineShareData({ 
          title: page.shareDesc, // 分享标题
          link: page.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: icon_url, // 分享图标
        })
      });
    }catch(e) {
      console.log(e)
    } 
  }

  
  

  render () {


    return (
      <div className="info_body">
        <Meta/>
        <Head>
          <title>比赛报名流程</title>
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
        </Head>
        <div className="info_title"><h3>寒假青少年艺术比赛报名流程</h3></div>
        <div className="info_liucheng">
          <h3>一、比赛介绍</h3>
          <ul>
            <li>1. 2020年“中国之星”北京少儿春晚</li>
            <div className="info-img">
              <div className="info-img-x1"></div>
              <div className="info-img-x2"></div>
            </div>
            <li>2. 第28节中国上海世界青少年“金玉兰奖”大赛</li>
            <div className="info-img">
              <div className="info-img-j1"></div>
              <div className="info-img-j2"></div>
            </div>
          </ul>
          <h5>*比赛详情进入官方公众号查询</h5>
          <h3>二、参赛要求</h3>
          <ul>
            <li>1. 年龄：5 - 25岁</li>
            <li>2. 节目类型： 舞蹈、声乐、器乐、表演、语言、书画</li>
            <li>3. 节目主题要求健康向上，具有时代感和少年儿童特征及艺术性、民族性。 作品提倡原创，集体节目表演时长4分钟以内，个人节目3分钟以内（如超时会叫停）</li>
          </ul>
          <h3>三、时间安排</h3>
          <ul>
            <li>1. 报名时间：2019年10月1日 - 2019年11月15日</li>
            <li>2. 河南赛区初赛： 2019年11月23、24日</li>
            <li>3. 全国总决赛： 2020年1月14、15日</li>
          </ul>
          <h3>四、报名方法</h3>
          <ul>
            <li>1. 搜索公众号“中原青少年艺术赛事网”并关注。</li>
            <li>2. 进入公众号，点击菜单 “我要参加” 下的 “报名” 按钮。</li>
            <li>3. 填写参赛表格，选择报选大赛：“中国之星”或“金玉兰奖”。</li>
          </ul>
        </div>
        <div className="info-qrcode">
          <h5>长按下方二维码进入公众号</h5>
          <img src="/static/info/qrcode_for_gh_17a95697c75e_344.jpg"/>
        </div>
      </div>
    )
  }
}


export default BSinfo

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
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: apiList // 必填，需要使用的JS接口列表
    });
  }catch(e) {

  }
  
}
