const nav = [
  '用户','报名','签约'
]



export default ({icon, username, onChangeNav, active}) => {


  const changeNav = (index) => {
    console.log(index);
    if (onChangeNav) onChangeNav(index);
  }

  const renderNav = () => nav.map((v, index) => <li key={index} onClick={changeNav.bind(this, index)} className={active === index?'active': null}>{v}</li>)


  return (
    <nav className="nav-backend">
      <div className="logo"></div>
      <div className="list">
        {renderNav()}
      </div>
      <div className="icon" style={{'backgroundImage': `url('/static/bisai/android-chrome-192x192.png')`}}></div>
    </nav>
  )
}