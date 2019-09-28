import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import '../styles/baoming.scss'
import Meta from '../components/bisaiMeta'


class Test extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      localStorage: false
    }
  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const query = req ? req.query : null;
    return { query, userAgent }
  }

  componentDidMount() {
    if (window && window.localStorage) this.setState({localStorage: true});
  }

  render () {
    return (
      <div className="baoming_body">
        <Meta/>
        <Head>
          <title>测试页面</title>
        </Head>
        <div className="relative_body">
          <h5>你好</h5>
          {/* <Link href="/test"></Link> */}
          <p>{JSON.stringify(this.props.query)}</p>
          <p>{JSON.stringify(this.props.userAgent)}</p>
          <p>localStorage: {this.state.localStorage?'支持':'不支持'}</p>
        </div>
      </div>
    )
  }
}


export default Test
