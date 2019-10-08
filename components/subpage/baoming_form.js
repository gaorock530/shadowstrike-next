import React from 'react';
import validator from 'validator';
import '../../styles/form.scss';
import {ops, renderAge, type, groupType} from '../../lib/formData';
import Select from '../form/select';
import Area from '../form/area';
import Input from '../form/input';
import Button from '../form/button';
import Code from '../form/code';

const errMsg1 = "不能为空或太长";
const errMsg2 = "手机格式不正确";
const errMsg3 = "验证码不正确";


 class BaomingForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: 0,
      area: {},
      type: 0,
      age: 5,
      cate: 0,
      groupType: 0,
      groupName: '',
      showName: '',
      contectPhone: '',
      lockPhone: false,
      code: '',
      valid_name: false,
      valid_showName: false,
      valid_contectPhone: false,
      valid_groupName: false,
      showError: false
    }
  }

  onChange = this.onBlur = (key, value, valid) => {
    this.setState({[key]: value});
    if (valid !== undefined) {
      this.setState({['valid_'+key]: valid});
    }
  }


  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(this.timer)
    if (!this.state.valid_name || 
      !this.state.valid_showName || 
      !this.state.valid_contectPhone || 
      (this.state.groupType !== 0 && !this.state.valid_groupName)) return;

    const codeVerify = await fetch('https://api.yingxitech.com/code/verify', {
      method: 'POST',
      body: JSON.stringify({
        unionid: this.props.unionid,
        phone: this.state.contectPhone,
        code: this.state.code
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const codeRes = await codeVerify.json();

    if (!codeRes.err) {
      clearTimeout(this.timer);
      console.log(this.state)
      this.props.onConfirm(this.state)
    } else {
      this.setState({showError: true});
      this.timer = setTimeout(() => {this.setState({showError: false})}, 3000);
    }
  }

  validateName = (value) => {
    if (value.length > 0 && value.length < 30) return true;
  }

  validatePhone = (value) => {
    return validator.isMobilePhone(String(value) , 'zh-CN');
  }

  getStatus = (status) => {
    console.log('status', status)
    if (status < 2) this.setState({lockPhone: true});
  }
  
  
  render () {

    return (
      <form className="baoming-form-wrapper" onSubmit={this.onSubmit}>
        <Input title="姓名" placeholder="参赛者姓名" onBlur={this.onBlur.bind(this, 'name')} validation={this.validateName} errMsg={errMsg1}/>
        <Select ops={[{name:'男', value: 0}, {name:'女', value: 1}]} onChange={this.onChange.bind(this, 'sex')} title="性别"/>
        <Area onChange={this.onChange.bind(this, 'area')} title="参赛地区"/>
        <Select ops={ops} onChange={this.onChange.bind(this, 'type')} title="选报大赛"/>
        <Select ops={renderAge()} onChange={this.onChange.bind(this, 'age')} title="年龄"/>
        <Select ops={type} onChange={this.onChange.bind(this, 'cate')} title="节目类型"/>
        <Input title="节目名称" placeholder="填写参赛节目名称" onBlur={this.onBlur.bind(this, 'showName')} validation={this.validateName} errMsg={errMsg1}/>
        <Input title="联系电话" placeholder="填写参赛者手机号/监护人手机号" type="number" onBlur={this.onBlur.bind(this, 'contectPhone')} validation={this.validatePhone} errMsg={errMsg2} lock={this.state.lockPhone}/>
        {this.state.valid_contectPhone && <Code getStatus={this.getStatus} onBlur={this.onBlur.bind(this, 'code')} unionid={this.props.unionid} phone={this.state.contectPhone}/>}
        {this.state.showError && <span style={{color: 'red'}}>{errMsg3}</span>}
        <Select ops={groupType} onChange={this.onChange.bind(this, 'groupType')} title="参赛单位类型"/>
        {String(this.state.groupType) !== '0' && <Input title="参赛单位名称" placeholder="幼儿园/学校/培训机构名称" onBlur={this.onBlur.bind(this, 'groupName')} validation={this.validateName} errMsg={errMsg1}/>}
        
        <Button/>
      </form>
    )
  }
    
  
}

export default BaomingForm;