// import React from 'react'
// import Link from 'next/link'

// const links = [
//   { href: 'https://zeit.co/now', label: 'ZEIT' },
//   { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
// ].map(link => {
//   link.key = `nav-link-${link.href}-${link.label}`
//   return link
// })
import axios from 'axios';
import anime from 'animejs';

const DIFF = 50;  
const HEIGHT = 200;
const DELAY = 50;

class Header extends React.PureComponent {
  constructor (props) {
    super(props);
    
    this.headerShow = true;
    this.scrollYDiff = 0;
    this.timer = null;
    this.init = true;
    this.open = false;
    
    this.bodyTop = 0;
    this.navTop = 0;
  }

  

  get isMobile () {
    return !window;
  }

  componentDidMount () {
    if (this.isMobile) return;
    this.prevScrollY = window.scrollY || 0;
    this.body = document.querySelector('html');
    this.HEIGHT = this.header.offsetHeight || HEIGHT;
    window.addEventListener('scroll', this.pageScroll);
  }

  componentWillUnmount () {
    if (this.isMobile) return;
    window.removeEventListener('scroll', this.pageScroll);
  }

  pageScroll = (e) => {
    if (this.isMobile) return;
    this.scrollYDiff += Math.abs(window.scrollY - this.prevScrollY);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.pageLogic, DELAY);
  }

  pageLogic = () => {
    if ((window.scrollY > this.prevScrollY && this.scrollYDiff >= DIFF) && window.scrollY >= this.HEIGHT && this.headerShow) {
      if (this.init) this.init = false;
      else  this.hideHeader();//requestAnimationFrame(this.handleNav.bind(this, 'hide'));
    } else if (window.scrollY < this.prevScrollY && (this.scrollYDiff >= DIFF || window.scrollY <= this.HEIGHT || window.scrollY === 0) && !this.headerShow) {
       this.showHeader(); //requestAnimationFrame(this.handleNav.bind(this, 'show'));
    }
    this.timer = null;
    this.prevScrollY = window.scrollY;
  }

  hideHeader = () => {
    this.headerShow = false;
    anime({
      targets: [this.header],
      translateY: -95,
      duration: 300,
      easing: 'easeInCubic',
    })
  }
  showHeader = () => {
    this.headerShow = true;
    anime({
      targets: [this.header],
      translateY: 0,
      duration: 300,
      easing: 'easeOutCubic',
    })
  }

  login = async () => {
    const appid = 'wx09fc8bca51c925c7';
    const redirect_uri = 'http://192.168.1.107:5000/redirect';
    const scope = 'snsapi_userinfo';
    const state = '123abc';
    const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;

    console.log(url)

    // try {
    //   const response = await axios.get(url, {
    //     headers: {'Access-Control-Allow-Origin': '*'}
    //   });
    //   console.log('Success:', response);
    //   alert(response)
    // } catch (error) {
    //   alert(error);
    //   console.error('Error:', error);
    // }
  }


  /**
   * 
   */
  clickBar = (e) => {
    this.open = !this.open;
    if (this.open) {
      e.target.classList.add('close');
      this.nav.classList.add('open');
      this.bodyTop = window.scrollY;
      this.body.classList.add('frozen');
    } else {
      e.target.classList.remove('close');
      this.nav.classList.remove('open');
      this.body.removeAttribute('class');
      window.scrollTo({top: this.bodyTop})
    }
  }

  render () {
    return (
      <header ref={el => this.header = el}>
        <div className="header_wrapper">
          <div className="header-item header-logo">ShadowStrike</div>
          <div className="header-item header-nav" ref={el => this.nav = el}>
            <a href="/" className="active">技术</a>
            <a href="/" className="soon">服务</a>
            <a href="/">产品</a>
            <a href="/" className="soon">APIs</a>
            <a onClick={this.login}>Play Ground</a>
          </div>
          <div className="minibar" onClick={this.clickBar}></div>
        </div>
      </header>
    )
  }
}

export default Header
