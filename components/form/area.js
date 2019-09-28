import React from 'react';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'


 class Area extends React.PureComponent {
  constructor(props) {
    super(props);
    this.province = this.props.province || [{value: 0, name: '河南省'}];
    this.city = this.props.city || [];
    this.area = this.props.area || [];
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }
  
  renderOps = (ops) => ops.map(op => <option value={op.value} key={op.key}>{op.name}</option>)
  
  render () {
    return (
      <div className="form-component-wrapper">
        <h3>{this.props.title || '缺省'}:</h3>
        <div className="form-area">
          <div className="form-component">
            <select onChange={this.onChange}>{this.renderOps(this.province)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          <div className="form-component">
            <select onChange={this.onChange}>{this.renderOps(this.city)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          <div className="form-component">
            <select onChange={this.onChange}>{this.renderOps(this.area)}</select>
            <FontAwesomeIcon icon={faSort} className="form-icon"/>
          </div>
          
        </div>
      </div>
      
    )
  }
    
  
}

export default Area;