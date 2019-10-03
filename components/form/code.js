import React from 'react';
import '../../styles/form.scss';
import Input from './input';


 class Code extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ops = this.props.ops || [];
    this.state = {lock: false}
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onBlur = (value) => {
    if (this.props.onBlur) this.props.onBlur(value);
  }

  getCode = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let status = 2;

    console.log(this.props.openid, this.props.phone)

    try {
      const codeRes = await fetch('https://api.yingxitech.com/code/get', {
        method: 'POST',
        body: JSON.stringify({
          unionid: this.props.openid,
          phone: this.props.phone
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await codeRes.json();
      status = res.status;
    }catch(e) {
      console.log(e)
    }
    
    this.setState({lock: status < 2})
    this.props.getStatus(status);

  }

  
  render () {
    return (
      <div className="form-component-wrapper">
        <div className="form-component form-code">
          <Input type="number" onBlur={this.onBlur} valid={this.props.valid} errMsg={this.props.errMsg}/>
          <button onClick={this.getCode} disabled={this.state.lock} className={this.state.lock?'form-lock':null}>{!this.state.lock ?'获取验证码':"验证码已发"}</button>
        </div>
      </div>
      
    )
  }
    
  
}

export default Code;