const connection = require('../database/connection');




class Loaitour {

    constructor(loaiTour) {
        this.ma_loaitour = loaiTour?.ma_loaitour;
        this.loai_tour = loaiTour?.loai_tour;
        this.ghichu = loaiTour?.ghichu;
    }

    static getAll() {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM loai_tour";
          connection.query(query, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }

}

module.exports = Loaitour