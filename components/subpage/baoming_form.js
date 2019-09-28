import React from 'react';
import '../../styles/form.scss';
import cuid from 'cuid';
import Select from '../form/select';
import Area from '../form/area';
import Input from '../form/input';
import Button from '../form/button';


 class BaomingForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: '',
    }
  }

  onChange = (value) => {
    console.log(value)
  }

  onBlur = (value) => {
    console.log(value)
  }

  onSubmit = (e) => {
    e.preventDefault();
  }
  
  
  render () {
    // 选报大赛
    const ops = [
      {name: '中国之星', value: 0, key: cuid()},
      {name: '金玉兰奖', value: 1, key: cuid()}
    ]

    // 参赛地区
    const city = [
      {name: '新乡市', value: 0},
      {name: '郑州市', value: 1}
    ];

    const area = [
      {name: '红旗区', value: 0},
      {name: '卫滨区', value: 1}
    ]
 
    // 年龄
    const renderAge = () => {
      let age = [];
      for (let i=0;i<20;i++) {
        age.push({name: i+3, value: i+3})
      }
      return age;
    }

    // 参赛类型
    const type = [
      {name: '舞蹈', value: 0},
      {name: '声乐', value: 1},
      {name: '器乐', value: 2},
      {name: '表演', value: 3},
      {name: '语言', value: 4},
      {name: '书画', value: 5}
    ]
    return (
      <form className="baoming-form-wrapper" onSubmit={this.onSubmit}>
        <Input title="姓名" placeholder="参赛者姓名" onBlur={this.onBlur}/>
        <Select ops={renderAge()} onChange={this.onChange} title="年龄"/>
        <Select ops={[{name:'男', value: 0}, {name:'女', value: 1}]} onChange={this.onChange} title="性别"/>
        <Select ops={ops} onChange={this.onChange} title="选报大赛"/>
        <Area city={city} area={area} onChange={this.onChange} title="参赛地区"/>
        <Select ops={type} onChange={this.onChange} title="参赛类型"/>
        <Input title="节目名称" placeholder="填写参赛节目名称" onBlur={this.onBlur}/>
        <Input title="联系电话" placeholder="填写参赛者手机号/监护人手机号" type="number" onBlur={this.onBlur}/>
        <Button/>
      </form>
      
    )
  }
    
  
}

export default BaomingForm;