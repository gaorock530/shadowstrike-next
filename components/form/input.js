import React from 'react';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.type = this.props.type || 'text';
    this.state = { valid: this.props.valid || 0};
  }

  onChange = (e) => {
    if (this.props.lock) e.target.value = this.state.value;
  }

  onBlur = (e) => {
    if (this.props.lock) return;
    this.setState({value: e.target.value});
    
    let valid, value = 0;
    if (this.props.validation) {
      valid = this.props.validation(e.target.value);
      value = valid? 1: 2;
      this.props.onBlur && this.props.onBlur(e.target.value, !!valid);
    } else {
      this.props.onBlur && this.props.onBlur(e.target.value);
    }
    
    if (valid !== this.state.valid) this.setState({valid: value});
  }
  
  render () {
    const name = this.state.valid === 0? '': (this.state.valid === 1? ' pass':' error');

    return (
      <div className="form-component-wrapper">
        {this.props.title && <h3>{this.props.title}:</h3>}
        <div className="form-component">
          {this.state.valid !==0 ? <FontAwesomeIcon icon={this.state.valid === 1?faCheck:faTimes} className={'form-icon' + name}/>: null}
          <input onBlur={this.onBlur} type={this.type} placeholder={this.props.placeholder} readOnly={this.props.lock} onChange={this.onChange} className={this.props.lock?'form-lock':null}/>
        </div>
        {(this.state.valid === 2 && this.props.errMsg) && <div className="form-error-msg"><p>{this.props.errMsg}</p></div>}
      </div>
      
    )
  }
    
  
}

export default Input;