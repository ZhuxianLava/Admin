// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/userController');

const app = express();

const ChuongTrinhTour = require('./models/chuongTrinhTour');
const LoaiTour = require('./models/loaiTour');
const DatTour = require('./models/datTour');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', userController.login);

// app.get('/homepage', (req, res) => {
//   const { access } = req.session;

//   if (access === 'admin') {
//     res.render('admin');
//   } else if (access === 'employee') {
//     res.render('employee');
//   } else {
//     res.render('homepage');
//   }
// });

app.get('/admin', (req, res) => {
  const { access } = req.session;
  if (req.session.access === 'admin' ||  req.session.access === 'employee') {
    res.render('admin',{access});
  } else {
    res.redirect('/login');
  }
});

// app.get('/danh-sach-chuong-trinh-tour', (req, res) => {
//   const { access } = req.session;
//   if (req.session.access === 'admin' ||  req.session.access === 'employee') {
//     res.render('danh-sach-chuong-trinh-tour',{access});
//   } else {
//     res.redirect('/login');
//   }
// });


//Danh sách chương trình tour
app.get('/danh-sach-chuong-trinh-tour', (req, res) => {
  const { access } = req.session;
  if (req.session.access === 'admin' ||  req.session.access === 'employee') {
  ChuongTrinhTour.getAll()
    .then(danhSachChuongTrinhTour => {
      LoaiTour.getAll().then((danhSachLoaiTour => {
        const data = JSON.parse(JSON.stringify(danhSachLoaiTour))
        //console.log(data)
        res.render('danh-sach-chuong-trinh-tour', { danhSachLoaiTour:data,danhSachChuongTrinhTour, access  },);
      }))
    })
    .catch(error => {
      console.error('Lỗi truy vấn: ' + error.stack);
      res.render('error', { message: 'Lỗi truy vấn cơ sở dữ liệu' });
    });
  } else {
    res.redirect('/login');
  }
});

app.post('/them-chuong-trinh-tour', (req, res) => {
  const { ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu } = req.body;

  // Tạo đối tượng chương trình tour từ lớp ChuongTrinhTour
  // const chuongTrinhTour = new ChuongTrinhTour();
  ChuongTrinhTour.save({
    ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu
  })
    .then(() => {
      res.redirect('/danh-sach-chuong-trinh-tour');
    })
    .catch(error => {
      console.error('Lỗi khi thêm chương trình tour: ' + error.stack);
      res.render('error', { message: 'Lỗi khi thêm chương trình tour' });
    });
});


app.post('/sua-chuong-trinh-tour', (req, res) => {
  // Tạo đối tượng chương trình tour từ lớp ChuongTrinhTour
  const { ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu } = req.body;
  
  ChuongTrinhTour.update({
    ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu
  })
    .then(() => {
      res.redirect('/danh-sach-chuong-trinh-tour/');
    })
    .catch(error => {
      console.error('Lỗi khi sửa chương trình tour: ' + error.stack);
      res.render('error', { message: 'Lỗi khi sửa chương trình tour' });
    });
});

app.post('/xoa-chuong-trinh-tour', (req, res) => {
  const { ma_tour } = req.body;

  // Gọi phương thức xóa từ lớp ChuongTrinhTour
  ChuongTrinhTour.delete(ma_tour)
    .then(() => {
      res.redirect('/danh-sach-chuong-trinh-tour');
    })
    .catch(error => {
      console.error('Lỗi khi xóa chương trình tour: ' + error.stack);
      res.render('error', { message: 'Lỗi khi xóa chương trình tour' });
    });
});


//Danh sách đặt tour
app.get('/danh-sach-dat-tour', (req, res) => {
  const { access } = req.session;
  if (req.session.access === 'admin' ||  req.session.access === 'employee') {
  DatTour.getAll()
    .then(danhSachDatTour => {
      res.render('danh-sach-dat-tour', { danhSachDatTour , access },);
    })
    .catch(error => {
      console.error('Lỗi truy vấn: ' + error.stack);
      res.render('error', { message: 'Lỗi truy vấn cơ sở dữ liệu' });
    });
  } else {
    res.redirect('/login');
  }
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log("Bạn có thể truy cập: http://localhost:3000/login");
});
