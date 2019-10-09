import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class User extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      count: 0
    }
    this.page = 1;

  }

  async componentDidMount () {
    const users = await getUser();
    if (users) {
      this.setState({list: users.selected, count: users.count})
    }
  }



  renderUser = (arr) => arr.map((a, index) => (
    <tr key={index}>
      <th><div className="icon" style={{'backgroundImage': `url('${a.pic}')`}}></div></th>
      <td>{a.nickname}</td>
      <td>{a.sex===0?'未知':(a.sex===1?'男':'女')}</td>
      <td>{a.wx_province}</td>
      <td>{a.wx_city}</td>
      <td>{a.visit_times || 1}</td>
      <td>{parseDate(a.lastVisit.time)}</td>
      <td><FontAwesomeIcon icon={a.baoming_id?faCheck:faTimes} className={'form-icon ' + (a.baoming_id?'pass':'error')}/></td>
    </tr>
  ))


  render () {
    return (
      <div className="backend_content">
        <table>
          <thead>
            <tr>
              <th>{this.state.count}</th>
              <th>昵称</th>
              <th>性别</th>
              <th>省份</th>
              <th>城市</th>
              <th>浏览</th>
              <th>最后</th>
              <th>报名</th>
            </tr>
          </thead>
          <tbody>
          {this.renderUser(this.state.list)}
          </tbody>
        </table>
      </div>
    )
  }
}

async function getUser (page) {
  try {
    const res = await fetch(`${process.env.HOST}/users?page=${page}`, {
      method: 'POST',
      body: JSON.stringify({token: '123'}),
      headers: {'Content-Type': 'application/json'}
    });
    const users = await res.json();
    if (users.err) return false;
    console.log(users.selected)
    return users
  }catch(e) {
    return false;
  }
}

function parseDate (timestamp) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth()+1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minite = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  return `${year}/${month}/${day} ${hour}:${minite}:${second}`;
} 