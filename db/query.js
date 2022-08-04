const con = require("./conn");

exports.createUser = (id, name, email, password, address, mobile) => {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO userdetails (id, name, email, password, address, mobile) VALUES (${id}, "${name}", "${email}", "${password}","${address}", ${mobile})`;

    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
    

exports.checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM userdetails where email = "${email}"`;
    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
exports.checkEmailPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM userdetails where email = "${email}" and password="${password}"`;
    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
exports.DeleteUser = (id) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM userdetails WHERE id = "${id}"`;
    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
exports.UpdateUser = (id, name, email, address, mobile) => {
  return new Promise((resolve, reject) => {
    var sql = `UPDATE userdetails
        SET name = '${name}', email= '${email}',address='${address}',mobile='${mobile}'
        WHERE id= "${id}"`;
    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
exports.GetImage = (id) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT userdetails.id, userdetails.name,userdetails.email,userdetails.password,userdetails.address,userimage.ImageUrl
        FROM userdetails
        LEFT JOIN userimage ON userdetails.id = userimage.ImageId`;

    con.query(sql, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
