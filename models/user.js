const connection = require('../database/connection');

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const escapedUsername = connection.escape(username);
      const query = 'SELECT * FROM users WHERE username = ' + escapedUsername;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}

module.exports = User;
