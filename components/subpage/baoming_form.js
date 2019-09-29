import React from 'react';
import validator from 'validator';
import '../../styles/form.scss';
import cuid from 'cuid';
import Select from '../form/select';
import Area from '../form/area';
import Input from '../form/input';
import Button from '../form/button';
import Code from '../form/code';

// 选报大赛
const ops = [
  {name: '中国之星'},
  {name: '金玉兰奖'}
]

// 年龄
const renderAge = () => {
  let age = [];
  for (let i=0;i<30;i++) {
    age.push({name: i+5, value: i+5})
  }
  return age;
}

// 参赛类型
const type = [
  {name: '舞蹈'},
  {name: '声乐'},
  {name: '器乐'},
  {name: '表演'},
  {name: '语言'},
  {name: '书画'}
]

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
      showName: '',
      contectPhone: '',
      lockPhone: false,
      code: '',
      valid_Name: false,
      valid_showName: false,
      valid_contectPhone: false
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
    console.log(this.state);

    // try {
    //   const codeRes = await fetch('https://api.yingxitech.com/code/get', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       openid: this.props.openid,
    //       phone: this.state.contectPhone
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    // }catch(e) {

    // }

  }

  validateName = (value) => {
    if (value.length > 0 && value.length < 30) return true;
  }

  validatePhone = (value) => {
    
    return validator.isMobilePhone(String(value) , 'zh-CN');
  }

  getStatus = (status) => {
    console.log('status', status)
    this.setState({lockPhone: true});
  }
  
  
  render () {
    
    return (
      <form className="baoming-form-wrapper" onSubmit={this.onSubmit}>
        <p>{JSON.stringify(this.state)}</p>
        <Input title="姓名" placeholder="参赛者姓名" onBlur={this.onBlur.bind(this, 'name')} validation={this.validateName} errMsg={errMsg1}/>
        <Select ops={[{name:'男', value: 0}, {name:'女', value: 1}]} onChange={this.onChange.bind(this, 'sex')} title="性别"/>
        <Area onChange={this.onChange.bind(this, 'area')} title="参赛地区"/>
        <Select ops={ops} onChange={this.onChange.bind(this, 'type')} title="选报大赛"/>
        <Select ops={renderAge()} onChange={this.onChange.bind(this, 'age')} title="年龄"/>
        <Select ops={type} onChange={this.onChange.bind(this, 'cate')} title="参赛类型"/>
        <Input title="节目名称" placeholder="填写参赛节目名称" onBlur={this.onBlur.bind(this, 'showName')} validation={this.validateName} errMsg={errMsg1}/>
        <Input title="联系电话" placeholder="填写参赛者手机号/监护人手机号" type="number" onBlur={this.onBlur.bind(this, 'contectPhone')} validation={this.validatePhone} errMsg={errMsg2} lock={this.state.lockPhone}/>
        {this.state.valid_contectPhone && <Code getStatus={this.getStatus} onBlur={this.onBlur.bind(this, 'code')} valid={0} errMsg={errMsg3} openid={this.props.openid} phone={this.state.contectPhone}/>}
        <Button/>
      </form>
    )
  }
    
  
}

export default BaomingForm;