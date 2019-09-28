import React from 'react';
import '../../styles/form.scss';


 class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ops = this.props.ops || [];
  }
  
  render () {
    return (
      <div className="form-component-wrapper">
        <div className="form-component">
          <button>提交</button>
        </div>
      </div>
      
    )
  }
    
  
}

export default Button;