import React from 'react'
import Head from 'next/head'
import Body from '../components/body'


class Baoming extends React.PureComponent {

  constructor (props) {
    super (props);
    this.req = props.req;
  }

  // static async getInitialProps({ req }) {
  //   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  //   return { userAgent }
  // }

  render () {
    return (
      <div>
        <Head>
          <title>报名通道</title>
          <meta name="description" content="中原青少年艺术赛事网"/>
          <meta name="keywords" content="中原青少年艺术赛事网 中原 青少年 艺术 赛事" />
        </Head>
        <Body>
          <div className="top-content">
            报名通道即将开启
          </div>
          <div>
            {JSON.stringify(this.req)}
          </div>
        </Body>
        
      </div>
    )
  }
}


export default Baoming
