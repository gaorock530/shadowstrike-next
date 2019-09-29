import React from 'react';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import {hex_md5} from '../../lib/md5';
import cuid from 'cuid';


const DefaultProvinceIndex = 15;

 class Area extends React.PureComponent {
  constructor(props) {
    super(props);
    this.province = [];
    this.city = [];
    this.area = [];
    this.index = {
      province: DefaultProvinceIndex,
      city: 0,
      area: 0
    }
    this.state = {
      province: [],
      city: [],
      area: []
    }
  }

  async componentDidMount() {
    const map = window.localStorage.getItem('map');
    const hash = map?hex_md5(map):null;

    const newMap = await fetch('https://api.yingxitech.com/map/citylist', {
      method: 'POST',
      body: JSON.stringify({hash}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    


    const mapObj = await newMap.json();

    if (mapObj.err) return console.log(mapObj.err);

    if (mapObj) {
      window.localStorage.setItem('map', JSON.stringify(mapObj));
      this.province = mapObj[0];
      this.city = mapObj[1];
      this.area = mapObj[2];
    } else {
      const oldMap = JSON.parse(map);
      this.province = oldMap[0];
      this.city = oldMap[1];
      this.area = oldMap[2];
    }

    const cityList = this.getSlice(this.city, this.province, this.index.province);
    const areaList = this.getSlice(this.area, cityList, this.index.city);
    this.index.area = areaList.length !== 0 ? 0 : -1;

    this.setState({
      province: this.fillKeys(this.province),
      city: cityList,
      area: areaList,
    });

    this.props.onChange({
      province: this.province[this.index.province].fullname,
      city: cityList[this.index.city].fullname,
      area: areaList[this.index.area]?areaList[this.index.area].fullname:undefined,
    });
  }

  getSlice = (indexingList, Sourcelist, index) => {
    if (!Sourcelist[index].cidx) return [];
    const renge = Sourcelist[index].cidx;
    const slice = indexingList.slice(renge[0], renge[1]+1);
    return this.fillKeys(slice);
  }

  onChange = (type, e) => {
    if (type) this.index[type] = e.target.value;

    if (type === 'province') this.index.city = 0;
    
    const cityList = this.getSlice(this.city, this.province, this.index.province);
    const areaList = this.getSlice(this.area, cityList, this.index.city);
    
    
    if (type !== 'area') this.index.area = areaList.length !== 0 ? 0 : -1;

    this.setState({
      city: cityList,
      area: areaList,
    })

    this.props.onChange({
      province: this.province[this.index.province].fullname,
      city: cityList[this.index.city].fullname,
      area: areaList[this.index.area]?areaList[this.index.area].fullname:undefined,
    });
  }

  fillKeys = (arr) => arr.map((op, index) => {
    const newOp = op;
    if (!op.key) newOp.key = cuid();
    if (!op.value) newOp.value = index;
    return newOp;
  })
  
  
  renderOps = (ops) => ops.map(op => <option value={op.value} key={op.key}>{op.fullname}</option>)

  renderProvince = (ops) => ops.map((op, index) => <option value={op.value} key={op.key} disabled={index !== 15}>{op.fullname}</option>);
  
  render () {
    return (
      <div className="form-component-wrapper">
        <h3>{this.props.title || '缺省'}:</h3>
        <div className="form-area">
          <div className="form-component">
            <select onChange={this.onChange.bind(this, 'province')} defaultValue={15}>{this.renderProvince(this.state.province)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          <div className="form-component">
            <select onChange={this.onChange.bind(this, 'city')}>{this.renderOps(this.state.city)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          <div className="form-component">
            <select onChange={this.onChange.bind(this, 'area')}>{this.renderOps(this.state.area)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          
        </div>
      </div>
      
    )
  }
    
  
}

export default Area;