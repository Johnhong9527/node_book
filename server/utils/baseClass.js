const config = require("../config");
const sql = require("../utils/db");

class BaseClass {
  constructor() {
    this.tableName = "";
    this.maxSpace = config.baseInfo?.maxSpace || 1073741824; // 用户默认上传空间大小只有1G
    this.successCode = config.baseInfo?.successCode || 200;
    this.errCode = config.baseInfo?.errCode || 300;
    this.successMsg = config.baseInfo?.successMsg || "成功！";
    this.errMsg = config.baseInfo?.errMsg || "失败！";
  }

  success(data, msg = this.successMsg, code = this.successCode) {
    return {
      data,
      code,
      msg,
    };
  }

  error(data, msg = this.errMsg, code = this.errCode) {
    return {
      data,
      code,
      msg,
    };
  }

  /**
   * 查询数据是否存在
   * @param params[key]           查询的列
   * @param params[key][value]    查询的值
   * @param isAll                 是否展示所有返回结果 默认为 false
   * @returns {Promise<unknown>}  [ RowDataPacket { user_name: '谭娟' } ]
   */
  findByOnly(params, isAll = false) {
    return new Promise((resolve, reject) => {
      const key = Object.getOwnPropertyNames(params)[0];
      sql.query(
        `SELECT ${isAll ? "*" : key} FROM ${
          this.tableName
        } WHERE is_delete != 1 AND ?`,
        params,
        function (error, results) {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }

  // TODO 分页
  // TODO 分页模糊查询
  // TODO 分页模糊查询大数据优化
  // TODO 分页模糊查询单子段排序
  // TODO 分页模糊查询多子段排序
}

module.exports = BaseClass;
