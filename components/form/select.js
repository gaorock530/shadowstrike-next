import React from 'react';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import cuid from 'cuid';


 class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ops = this.props.ops || [];
    this.ops = this.ops.map((op, index) => {
      const newOp = op;
      if (!op.key) newOp.key = cuid();
      if (!op.value) newOp.value = index;
      return newOp;
    })
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }
  
  renderOps = (ops) => ops.map(op => <option value={op.value} key={op.key}>{op.name}</option>)
  
  render () {
    return (
      <div className="form-component-wrapper">
        {this.props.title && <h3>{this.props.title}:</h3>}
        <div className="form-component">
          <select onChange={this.onChange}>{this.renderOps(this.ops)}</select>
          <FontAwesomeIcon icon={faSort} className="form-icon"/>
        </div>
      </div>
      
    )
  }
    
  
}

export default Select;