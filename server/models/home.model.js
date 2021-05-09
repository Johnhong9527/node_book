const { v4: uuid4 } = require("uuid");
const sql = require("../utils/db");
const baseClass = require("../utils/baseClass");

class UserModel extends baseClass {
  constructor(customer) {
    super();
    this.tableName = "content";
    this.email = customer?.email;
    this.name = customer?.name;
    this.active = customer?.active;
  }

  create(params) {
    return new Promise((resolve, reject) => {
      params.user_id = params.user_id || uuid4().replace(/-/g, "");
      params.create_time = new Date();
      params.update_time = params.create_time;
      sql.query("INSERT INTO user SET ?", params, function (error, results) {
        if (error) throw reject(error);
        resolve({
          ...results,
          id: results.insertId,
        });
      });
    });
  }

  delete(params) {
    // UPDATE `express_mysql_db`.`user` SET `is_delete` = '1' WHERE (`id` = '3');
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE user SET is_delete = 1 WHERE ?",
        params,
        function (error, results) {
          if (error) throw reject(error);
          resolve({
            ...results,
          });
        }
      );
    });
  }
}

module.exports = UserModel;
