const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare()
.then(() => {
  const server = express();
  server.disable('x-powered-by');
  server.use(express.static('./public'));

  server.get('/pay/MP_verify_FdS96m4Og6Nb5Yrw.txt', (req, res) => {
    res.send('FdS96m4Og6Nb5Yrw');
  })

  // server.get('/shop/MP_verify_FdS96m4Og6Nb5Yrw.txt', (req, res) => {
  //   res.send('FdS96m4Og6Nb5Yrw');
  // })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// const { createServer } = require('https')
// // const { parse } = require('url')
// const next = require('next')
// const express = require('express')
// ​
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const options = {
//   key: fs.readFileSync(path.join(__dirname, '/ssl/www/2_www.yingxitech.com.key')),
//   cert: fs.readFileSync(path.join(__dirname, '/ssl/www/1_www.yingxitech.com_bundle.crt'))
// };
// ​
// app.prepare().then(() => {
//   const server = express();
//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });
//   createServer(options, server).listen(3000, err => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// })