module.exports = async function (id, callback) {
  const prepay = await fetch('https://api.yingxitech.com/pay/request', {
      method: 'POST',
      body: JSON.stringify({unionid: id}),
      headers: {'Content-Type': 'application/json'}
  })
  const prepayJson = await prepay.json();
  if (prepayJson.err) return callback(prepayJson.err);

  console.log(prepayJson)

  prepayJson['success'] = (res) => {
    callback('支付成功');
    
  };
  delete prepayJson['appId'];
  wx.chooseWXPay(prepayJson);
}