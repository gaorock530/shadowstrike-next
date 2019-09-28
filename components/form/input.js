import React from 'react';
import '../../styles/form.scss';


 class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.type = this.props.type || 'text';
  }

  onBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e.target.value);
  }
  
  render () {
    return (
      <div className="form-component-wrapper">
        <h3>{this.props.title || '缺省'}:</h3>
        <div className="form-component">
          <input onBlur={this.onBlur} type={this.type} placeholder={this.props.placeholder}/>
        </div>
      </div>
      
    )
  }
    
  
}

export default Input;