import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import {ops, type, groupType} from '../../lib/formData';

export default class Baoming extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      count: 0
    }
    this.page = 1;

  }

  async componentDidMount () {
    const races = await getRace();
    if (races) {
      this.setState({list: races.selected, count: races.count})
    }
  }



  renderUser = (arr) => arr.map((a, index) => (
    <tr key={index}>
      <th><div>1</div></th>
      <td>{a.baoming_name}</td>
      <td>{a.baoming_sex===1?'男':'女'}</td>
      <td>{a.baoming_age}</td>
      <td>{a.baoming_location.province+a.baoming_location.city+a.baoming_location.area}</td>
      <td>{ops[Number(a.baoming_type)].name}</td>
      <td>{type[Number(a.baoming_cate)].name}</td>
      <td>{a.baoming_showName}</td>
      <td>{a.baoming_phone}</td>
      <td>{groupType[Number(a.baoming_groupType)].name}</td>
      <td>{a.baoming_groupName}</td>
      <td>{a.baoming_code}</td>
      <td>{a.baoming_code_refer}</td>
      <td><FontAwesomeIcon icon={a.bisai_paid?faCheck:faTimes} className={'form-icon ' + (a.bisai_paid?'pass':'error')}/></td>
      <td>{a.bisai_paid_amount || 0}</td>
      
    </tr>
  ))


  render () {
    return (
      <div className="backend_content">
        <table>
          <thead>
            <tr>
              <th>{this.state.count}</th>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>地区</th>
              <th>报送大赛</th>
              <th>种类</th>
              <th>节目</th>
              <th>电话</th>
              <th>参赛团体</th>
              <th>团体名称</th>
              <th>报名码</th>
              <th>报名推广人</th>
              <th>缴费</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
          {this.renderUser(this.state.list)}
          </tbody>
        </table>
      </div>
    )
  }
}

//   baoming_name: { type: String, required: true },
//   baoming_sex: { type: Number, required: true }, 
//   baoming_age: {type: Number, required: true },
//   baoming_location: { type: Object, required: true},
//   baoming_type: {type: Number, required: true },               // 0 - beijing, 1 - shanghai
//   baoming_cate: {type: Number, required: true },               // 0 - 舞蹈, 1 - 声乐, 2 - 乐器, 3 - 表演, 4 - 语言, 5 - 书画
//   baoming_showName: {type: String, required: true},
//   baoming_phone: {type: String, required: true},
//   baoming_groupType: {type: Number, required: true},
//   baoming_groupName: {type: String},

//   baoming_code: {type: String},
//   baoming_code_refer: {type: String},
//   bisai_paid: {type: Boolean, default: false},
//   bisai_paid_amount: {type: Number},

async function getRace (page) {
  try {
    const res = await fetch(`https://api.yingxitech.com/races?page=${page}`, {
      method: 'POST',
      body: JSON.stringify({token: '123'}),
      headers: {'Content-Type': 'application/json'}
    });
    const races = await res.json();
    if (races.err) return false;
    console.log(races.selected)
    return races
  }catch(e) {
    return false;
  }
}
