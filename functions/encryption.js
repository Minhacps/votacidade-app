const CryptoJS = require('crypto-js');

const encrypt = (file) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(file),
    process.env.VOTACIDADE_ENCRYPTION_KEY,
  ).toString();

const decrypt = (file) => {
  var decrypted = CryptoJS.AES.decrypt(
    file,
    process.env.VOTACIDADE_ENCRYPTION_KEY,
  );
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

module.exports = {
  encrypt,
  decrypt,
};
