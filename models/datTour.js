const connection = require('../database/connection');



class DatTour {

  constructor(datTour){
    this.ma_dattour = datTour?.ma_dattour;
    this.ma_tour = datTour?.ma_tour;
    this.ma_diemdl = datTour?.ma_diemdl;
    this.ngay_dat = datTour?.ngay_dat;
    this.so_cho = datTour?.so_cho;
    this.thanh_tien = datTour?.thanh_tien;
    this.donvi = datTour?.donvi;
    this.da_thanhtoan = datTour?.da_thanhtoan;
    this.trangthai = datTour?.trangthai;
  }

  static getById(ma_dattour) {
    return new Promise((resolve, reject) => {
      const query = "SELECT ma_dattour, ma_tour, ma_diemdl, DATE_FORMAT(ngay_dat, '%d-%m-%Y') AS ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai FROM dat_tour Where ma_dattour = ? }";
      connection.query(query,[ma_dattour],(error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT ma_dattour, ma_tour, ma_diemdl, DATE_FORMAT(ngay_dat, '%d-%m-%Y') AS ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai FROM dat_tour";
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static save(datTourData) {
    return new Promise((resolve, reject) => {
      const { ma_dattour, ma_tour, ma_diemdl, ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai } = datTourData;

      // Truy vấn SQL INSERT để thêm chương trình tour vào cơ sở dữ liệu
      const sql = `INSERT INTO  ma_dattour, ma_tour, ma_diemdl, DATE_FORMAT(ngay_dat, '%d-%m-%Y') AS ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai) VALUES (?, ?, ?,  STR_TO_DATE(?, '%d-%m-%Y '),  ?, ?, ?, ?, ?)`;
      const values = [ma_dattour, ma_tour, ma_diemdl, ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai];
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Lỗi khi lưu đặt tour: ' + error.stack);
          reject(error);
        } else {
          console.log('Đặt tour đã được lưu vào cơ sở dữ liệu');
          resolve();
        }
      });
    });
  }

  static update(datTourData) {
    return new Promise((resolve, reject) => {
      const { ma_dattour, ma_tour, ma_diemdl, ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai } = datTourData;

  // Thực hiện câu truy vấn SQL để cập nhật thông tin chương trình tour
    const sql = `
    UPDATE dat_tour
    SET ma_dattour = ?, ma_tour = ?, ma_diemdl = ?, ngay_dat = STR_TO_DATE(?, '%d-%m-%Y '), so_cho = ?, thanh_tien = ?, donvi = ?, da_thanhtoan = ?, trangthai = ?
    WHERE ma_dattour = ?
     `;
   const values = [ma_dattour, ma_tour, ma_diemdl, ngay_dat, so_cho, thanh_tien, donvi, da_thanhtoan, trangthai];

   connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Lỗi khi cập nhật đặt tour: ' + error.stack);
      // Xử lý lỗi
    } else {
      console.log('Đặt tour đã được cập nhật thành công');
      // Chuyển hướng hoặc xử lý thành công khác
    }
    });
    });
  }



  static delete(ma_dattour) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM dat_tour WHERE ma_dattour = ?';
      connection.query(sql, [ma_dattour], (error, results) => {
        if (error) {
          console.error('Lỗi khi xóa đặt tour: ' + error.stack);
          reject(error);
        } else {
          console.log('Đặt tour đã được xóa khỏi cơ sở dữ liệu');
          resolve();
        }
      });
    });
  }
}

module.exports = DatTour;