const fs = require('fs');
const CryptoJS = require('crypto-js');

const encrypt = (file) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(file),
    process.env.VOTACIDADE_ENCRYPTION_KEY,
  ).toString();

const encryptJsonFile = (filePath) =>
  encrypt(JSON.parse(fs.readFileSync(filePath)));

const decrypt = (file) => {
  var decrypted = CryptoJS.AES.decrypt(
    file,
    process.env.VOTACIDADE_ENCRYPTION_KEY,
  );
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

module.exports = {
  encrypt,
  encryptJsonFile,
  decrypt,
};
