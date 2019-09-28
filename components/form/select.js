import React from 'react';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'


 class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ops = this.props.ops || [];
    console.log(this.ops)
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }
  
  renderOps = (ops) => ops.map(op => <option value={op.value} key={op.key}>{op.name}</option>)
  
  render () {
    return (
      <div className="form-component-wrapper">
        <h3>{this.props.title || '缺省'}:</h3>
        <div className="form-component">
          <select onChange={this.onChange}>{this.renderOps(this.ops)}</select>
          <FontAwesomeIcon icon={faSort} className="form-icon"/>
        </div>
      </div>
      
    )
  }
    
  
}

export default Select;