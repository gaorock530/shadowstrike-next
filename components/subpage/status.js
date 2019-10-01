import React from 'react';
import '../../styles/form.scss';
import Head from 'next/head'
import {ops, type, groupType} from '../../lib/formData';

export default ({raceData}) => {

  const data = [
    {t: '姓名', v: raceData.baoming_name},
    {t: '年龄', v: raceData.baoming_age},
    {t: '性别', v: !Number(raceData.baoming_sex) ?'男':'女'},
    {t: '报选大赛', v: ops[Number(raceData.baoming_type)].name},
    {t: '参赛地区', v: raceData.baoming_location.province+raceData.baoming_location.city+raceData.baoming_location.area},
    {t: '节目类型', v: type[Number(raceData.baoming_cate)].name},
    {t: '节目名称', v: raceData.baoming_showName},
    {t: '参赛单位类型', v: groupType[Number(raceData.baoming_groupType)].name},
    {t: '参赛单位名称', v: raceData.baoming_groupName || '无'},
    {t: '联系电话', v: raceData.baoming_phone},
    {t: '报名状态', v: '已报名'},
    {t: '缴费状态',v: raceData.bisai_paid?'已支付':'未支付'}
  ];

  const renderTable = (arr) => arr.map((a, index) => <tr key={index}><th>{a.t}:</th><td>{a.v}</td></tr>)

  return (
    <div className="form-component-wrapper notweixin">
      <Head>
          <title>报名状态</title>
      </Head>
      <h2>您已经报名成功</h2>

      <table>
        <tbody>
        {renderTable(data)}
        </tbody>
      </table>
    </div>
  )
};



