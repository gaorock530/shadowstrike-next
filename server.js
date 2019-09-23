const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare()
.then(() => {
  const server = express();
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
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