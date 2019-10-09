import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Baoming extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      count: 0
    }
    this.page = 1;

  }

  async componentDidMount () {
    const refers = await getRefer();
    if (refers) {
      this.setState({list: refers.selected, count: refers.count})
    }
  }

  newRefer = async () => {
    const res = await newRefer('asd')
    console.log(res);
  }



  renderRefer = (arr) => arr.map((a, index) => (
    <tr key={index}>
      <th><div>1</div></th>
      <td>{a.refer}</td>
      <td>{a.location}</td>
      <td>{a.code}</td>
      <td>{a.count}</td>      
    </tr>
  ))


  render () {
    return (
      <div className="backend_content">
        <div className="plus" onClick={this.newRefer}><FontAwesomeIcon icon={faPlus} className='form-icon'/></div>
        <table>
          <thead>
            <tr>
              <th>{this.state.count}</th>
              <th>报名推广人</th>
              <th>地区</th>
              <th>报名码</th>
              <th>人数</th>
            </tr>
          </thead>
          <tbody>
          {this.renderRefer(this.state.list)}
          </tbody>
        </table>
      </div>
    )
  }
}

async function newRefer (name) {
  try {
    const res = await fetch(`https://api.yingxitech.com/refer/register`, {
      method: 'POST',
      body: JSON.stringify({name}),
      headers: {'Content-Type': 'application/json'}
    });
    const refers = await res.json();
    if (refers.err) return false;
    console.log(refers.selected)
    return refers
  }catch(e) {
    return false;
  }
}

async function getRefer (page) {
  try {
    const res = await fetch(`https://api.yingxitech.com/refers?page=${page}`, {
      method: 'POST',
      body: JSON.stringify({token: '123'}),
      headers: {'Content-Type': 'application/json'}
    });
    const refers = await res.json();
    if (refers.err) return false;
    console.log(refers.selected)
    return refers
  }catch(e) {
    return false;
  }
}
