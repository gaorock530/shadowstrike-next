import React from 'react';
import '../../styles/form.scss';
import Head from 'next/head'
import Meta from '../bisaiMeta'

export default () => {
  return (
    <div className="form-component-wrapper notweixin">
      <Meta/>
      <Head>
          <title>大赛报名通道</title>
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
      </Head>
      <h2>欢迎来到中原青少年艺术赛事网</h2>

      <h4>报名指引</h4>
      <p>第一步：长按下方二维码，进入公众号</p>
      <p>第二步：关注公众号</p>
      <p>第三步：点击 ‘我要参加’ - ‘报名’</p>
      <img src="/qrcode_for_gh_17a95697c75e_344.jpg"/>
    </div>
  )
};



