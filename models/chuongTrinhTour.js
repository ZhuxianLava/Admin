const connection = require('../database/connection');




class ChuongTrinhTour {

  constructor(chuongTrinhTour){
    this.maTour = chuongTrinhTour?.maTour;
    this.ten_tour = chuongTrinhTour?.ten_tour;
    this.gia = chuongTrinhTour?.gia;
    this.donvitinh = chuongTrinhTour?.donvitinh;
    this.ngay_khoihanh = chuongTrinhTour?.ngay_khoihanh;
    this.ngay_ketthuc =chuongTrinhTour?.ngay_ketthuc;
    this.so_ngay = chuongTrinhTour?.so_ngay;
    this.so_dem = chuongTrinhTour?.so_dem;
    this.so_cho = chuongTrinhTour?.so_cho;
    this.noidung = chuongTrinhTour?.noidung;
    this.hinhanh = chuongTrinhTour?.hinhanh;
    this.ma_loaitour = chuongTrinhTour?.ma_loaitour;
    this.socho_dadat = chuongTrinhTour?.socho_dadat;
    this.ghichu = chuongTrinhTour?.ghichu;
  }

  static getById(maTour) {
    return new Promise((resolve, reject) => {
      const query = "SELECT ma_tour, ten_tour, gia, donvitinh, DATE_FORMAT(ngay_khoihanh, '%d-%m-%Y') AS ngay_khoihanh, DATE_FORMAT(ngay_ketthuc, '%d-%m-%Y ') AS ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu FROM chuongtrinh_tour Where ma_tour = ? }";
      connection.query(query,[maTour],(error, results) => {
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
      const query = "SELECT ma_tour, ten_tour, gia, donvitinh, DATE_FORMAT(ngay_khoihanh, '%d-%m-%Y') AS ngay_khoihanh, DATE_FORMAT(ngay_ketthuc, '%d-%m-%Y ') AS ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu FROM chuongtrinh_tour";
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static save(chuongTrinhTourData) {
    return new Promise((resolve, reject) => {
      const { ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu } = chuongTrinhTourData;

      // Truy vấn SQL INSERT để thêm chương trình tour vào cơ sở dữ liệu
      const sql = `INSERT INTO chuongtrinh_tour (ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu) VALUES (?, ?, ?, ?, STR_TO_DATE(?, '%d-%m-%Y '), STR_TO_DATE(?, '%d-%m-%Y '), ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu];
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Lỗi khi lưu chương trình tour: ' + error.stack);
          reject(error);
        } else {
          console.log('Chương trình tour đã được lưu vào cơ sở dữ liệu');
          resolve();
        }
      });
    });
  }

  static update(chuongTrinhTourData) {
    return new Promise((resolve, reject) => {
      const { ma_tour, ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu } = chuongTrinhTourData;

  // Thực hiện câu truy vấn SQL để cập nhật thông tin chương trình tour
    const sql = `
    UPDATE chuongtrinh_tour
    SET ten_tour = ?, gia = ?, donvitinh = ?, ngay_khoihanh = STR_TO_DATE(?, '%d-%m-%Y '), ngay_ketthuc = STR_TO_DATE(?, '%d-%m-%Y '), so_ngay = ?, so_dem = ?, so_cho = ?, noidung = ?, hinhanh = ?, ma_loaitour = ?, socho_dadat = ?, ghichu = ?
    WHERE ma_tour = ?
     `;
   const values = [ten_tour, gia, donvitinh, ngay_khoihanh, ngay_ketthuc, so_ngay, so_dem, so_cho, noidung, hinhanh, ma_loaitour, socho_dadat, ghichu, ma_tour];

   connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Lỗi khi cập nhật chương trình tour: ' + error.stack);
      // Xử lý lỗi
    } else {
      console.log('Chương trình tour đã được cập nhật thành công');
      // Chuyển hướng hoặc xử lý thành công khác
    }
    });
    });
  }



  static delete(maTour) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM chuongtrinh_tour WHERE ma_tour = ?';
      connection.query(sql, [maTour], (error, results) => {
        if (error) {
          console.error('Lỗi khi xóa chương trình tour: ' + error.stack);
          reject(error);
        } else {
          console.log('Chương trình tour đã được xóa khỏi cơ sở dữ liệu');
          resolve();
        }
      });
    });
  }
}

module.exports = ChuongTrinhTour;