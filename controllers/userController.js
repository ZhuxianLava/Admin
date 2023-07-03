const User = require('../models/user');

function login(req, res) {
  const { username, password } = req.body;

  User.findByUsername(username)
    .then(user => {
      if (user) {
        // Kiểm tra mật khẩu
        if (user.password === password) {
          req.session.username = user.username;
          req.session.access = user.access;

          if (user.access === 'admin' || user.access === 'employee' ) {
            res.redirect('/admin');
          }  else {
            res.redirect('/login');
          }
        } else {
          res.render('login', { message: 'Tài khoản hoặc mật khẩu không chính xác' });
        }
      } else {
        res.render('login', { message: 'Tài khoản hoặc mật khẩu không chính xác' });
      }
    })
    .catch(error => {
      console.error('Lỗi truy vấn: ' + error.stack);
      res.render('error', { message: 'Lỗi truy vấn cơ sở dữ liệu' });
    });
}

module.exports = {
  login
};
