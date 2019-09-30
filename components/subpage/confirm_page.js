import React from 'react';
import '../../styles/form.scss';
import {ops, type, groupType} from '../../lib/formData';



class Comfirm extends React.PureComponent {

  baoming = async () => {
    try {
      const baomingRes = await fetch('https://api.yingxitech.com/baoming', {
        method: 'POST',
        body: JSON.stringify({
          openid: this.props.openid,
          name: this.props.formData.name,
          sex: this.props.formData.sex,
          age: this.props.formData.age,
          area: this.props.formData.area,
          type: this.props.formData.type,
          cate: this.props.formData.cate,
          showName: this.props.formData.name,
          phone: this.props.formData.contectPhone,
          groupType: this.props.formData.groupType,
          groupName: this.props.formData.groupName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const baomingJson = await baomingRes.json();

      if (baomingJson.err) return;

      if (this.props.onSubmit) this.props.onSubmit();
    }catch(e) {

    }

    
  }

  renderTable = (arr) => arr.map((a, index) => <tr key={index}><th>{a.t}:</th><td>{a.v}</td></tr>)

  render () {
    const formData = this.props.formData;
    const data = [
      {t: '姓名', v: formData.name},
      {t: '年龄', v: formData.age},
      {t: '性别', v: !Number(formData.sex) ?'男':'女'},
      {t: '报选大赛', v: ops[Number(formData.type)].name},
      {t: '参赛地区', v: formData.area.province+formData.area.city+formData.area.area},
      {t: '节目类型', v: type[Number(formData.cate)].name},
      {t: '节目名称', v: formData.showName},
      {t: '参赛单位类型', v: groupType[Number(formData.groupType)].name},
      {t: '参赛单位名称', v: formData.groupName || '无'},
      {t: '联系电话', v: formData.contectPhone},
    ]

    return (
      <div className="form-confirm-wrapper">
        {!formData? <p>没有数据</p>:<table>
          <tbody>
          {this.renderTable(data)}
         </tbody>
        </table>}
        <div className="form-component-wrapper">
          <div className="form-component">
            <button onClick={this.baoming} disabled={!formData}>确认报名</button>
          </div>
        </div>
      </div>
      
    )
  }
    
  
}

export default Comfirm;
//{JSON.stringify(this.formData)}