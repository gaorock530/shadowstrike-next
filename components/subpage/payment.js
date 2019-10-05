import React from 'react';
import '../../styles/form.scss';
import wxpay from '../../lib/pay';

class Payment extends React.PureComponent {

  // pay = async () => {
  //   const prepay = await fetch('https://api.yingxitech.com/pay/request', {
  //     method: 'POST',
  //     body: JSON.stringify({unionid: this.props.unionid}),
  //     headers: {'Content-Type': 'application/json'}
  //   })
  //   const prepayJson = await prepay.json();
  //   if (prepayJson.err) return this.props.onSubmit(prepayJson.err);

  //   console.log(prepayJson)

  //   prepayJson['success'] = (res) => {
  //     this.props.onSubmit('支付成功');
      
  //   };
  //   delete prepayJson['appId'];

  //   wx.chooseWXPay(prepayJson);
  // }

  pay = async () => {
    await wxpay(wx, this.props.unionid, this.props.onSubmit);
  }


  render () {
  
    return (
      <div className="form-pay-wrapper">
        <h4>您已报名成功，请缴纳河南赛区参赛费用</h4>
        <h4>支付金额： 500元</h4>
        <button onClick={this.pay}>支付确认</button>
        <p>注：缴费成功后即可获得参赛资格。所有参赛选手将获得比赛视频录制，专家评委点评指导，比赛媒体报道，精美参赛礼品， INGLEMIREPHARM’S英树商城优惠，免费写真照两组（郑州昭元儿童摄影），初赛成绩优异者报送全国总决赛。</p>
      </div>
      
    )
  }
    
  
}

export default Payment;

