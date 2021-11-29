const cloudinary = require('cloudinary').v2;
const boom = require('@hapi/boom');

cloudinary.config(process.env.CLOUDINARY_URL);

const isValidExt = (file, allowExt) => {
  const nameCut = file.name.split('.');
  const ext = nameCut[nameCut.length - 1];

  if (allowExt.includes(ext)) {
    return true;
  } else {
    return false;
  }
};

const uploadFile = ({ files, allowFile, allowExt, allowedAmount = 4 }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const arrSecureUrl = [];
    const arrPromise = [];
    const arrImages = [];

    try {
      for (let file in files) {
        if (allowFile.includes(file)) {
          const miFile = files[file];
          if (!Array.isArray(miFile)) {
            if (!isValidExt(miFile, allowExt)) {
              reject({
                msg: 'You intend to upload a file with an extension not allowed',
              });
            }

            const { tempFilePath } = miFile;
            arrImages.push(`file ${miFile.name}`);
            arrPromise.push(cloudinary.uploader.upload(tempFilePath));
          } else {
            for (let i = 0; i < allowedAmount; i++) {
              const img = miFile[i];
              if (!isValidExt(img, allowExt)) {
                reject({
                  msg: 'You intend to upload a file with an extension not allowed',
                });
              }
              const { tempFilePath } = img;
              arrPromise.push(cloudinary.uploader.upload(tempFilePath));

              if (!miFile[i + 1]) {
                break;
              }
            }
          }
        }
      }

      if (!arrPromise) {
        reject({
          msg: 'You intend to upload a file with an extension not allowed',
        });
      }
      const resPromise = await Promise.all(arrPromise);
      for (let e = 0; e < resPromise.length; e++) {
        arrSecureUrl.push(resPromise[e].secure_url);
      }

      resolve(arrSecureUrl);
    } catch (error) {
      return new Error({
        msg: 'Something happened with cloudinary',
        error,
      });
    }
  });
};

module.exports = {
  uploadFile,
};
