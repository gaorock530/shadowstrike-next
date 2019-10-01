import React from 'react';
import '../../styles/form.scss';
import Head from 'next/head'
import {ops, type, groupType} from '../../lib/formData';

export default ({statusData}) => {

  const data = [
    {t: '姓名', v: statusData.baoming_name},
    {t: '年龄', v: statusData.baoming_age},
    {t: '性别', v: !Number(statusData.baoming_sex) ?'男':'女'},
    {t: '报选大赛', v: ops[Number(statusData.baoming_type)].name},
    {t: '参赛地区', v: statusData.baoming_location.province+statusData.baoming_location.city+statusData.baoming_location.area},
    {t: '节目类型', v: type[Number(statusData.baoming_cate)].name},
    {t: '节目名称', v: statusData.baoming_showName},
    {t: '参赛单位类型', v: groupType[Number(statusData.baoming_groupType)].name},
    {t: '参赛单位名称', v: statusData.baoming_groupName || '无'},
    {t: '联系电话', v: statusData.baoming_phone},
    {t: '报名状态', v: '已报名'},
    {t: '缴费状态',v: statusData.bisai_paid?'已支付':'未支付'}
  ];
  const pay = async () => {
    const prepay = await fetch('https://api.yingxitech.com/pay/request', {
      method: 'POST',
      body: JSON.stringify({openid: statusData.openid}),
      headers: {'Content-Type': 'application/json'}
    })
    const prepayJson = await prepay.json();
    if (prepayJson.err) return this.props.onSubmit(prepayJson.err);


    const success = (res) => {
      this.props.onSubmit('支付成功');
    }

    prepayJson['success'] = success;
    delete prepayJson['appId'];

    wx.chooseWXPay(prepayJson);
  }
  
  const renderTable = (arr) => arr.map((a, index) => <tr key={index}><th>{a.t}:</th><td>{a.v}</td></tr>)

  return (
    <div className="form-component-wrapper notweixin">
      <Head>
          <title>报名状态</title>
      </Head>
      <h2>您已经报名成功</h2>
      <div className="form-confirm-wrapper">
        <table>
          <tbody>
          {renderTable(data)}
          </tbody>
        </table>
      </div>
      <div className="form-pay-wrapper"><button onClick={pay}>支付确认</button></div>
      
    </div>
  )
};



