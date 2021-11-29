const boom = require('@hapi/boom');
const cloudinary = require('cloudinary').v2;

const { models } = require('../../../libs/sequelize');
const { uploadFile } = require('../../utils/upload-file');

cloudinary.config(process.env.CLOUDINARY_URL);

const allowFile = ['productImages'];
const allowExt = ['png', 'jpg', 'jpeg'];
let allowedAmount = 6;

class ProductImagesService {
  async create({ productId, files }) {
    let numberImg = 0;
    if (!files) {
      throw boom.badRequest('No images were sent');
    }

    const product = await models.Product.findByPk(productId);

    if (!product) {
      throw boom.notFound('product not found');
    }
    const imagesDb = await models.ProductImages.findAll({
      where: { productId },
    });
    const imgPromise = [];

    if (imagesDb.length === 6) {
      boom.badRequest('No more images can be added to this product');
    }

    if (imagesDb.length > 0) {
      allowedAmount = 6 - imagesDb.length;
      numberImg = imagesDb.length;
    }

    const arrUrl = await uploadFile({
      files,
      allowFile,
      allowExt,
      allowedAmount,
    });

    for (let i = 0; i < arrUrl.length; i++) {
      const data = {
        url: arrUrl[i],
        productId,
        numberImg: i + 1 + numberImg,
      };
      imgPromise.push(await models.ProductImages.create(data));
    }
    const images = await Promise.all(imgPromise);
    return images;
  }

  async update({ id, productId, files }) {
    if (!files) {
      throw boom.badRequest('No images were sent');
    }
    const productImage = await models.ProductImages.findOne({
      where: { id, productId },
      include: ['product'],
    });
    if (!productImage || !productImage.product) {
      throw boom.notFound('Image product not found');
    }

    const arrUrl = await uploadFile({
      files,
      allowFile,
      allowExt,
      allowedAmount: 1,
    });

    for (let i = 0; i < arrUrl.length; i++) {
      productImage.url = arrUrl[i];
    }
    return await productImage.save();
  }

  async delete(id) {
    const productImages = await models.ProductImages.findByPk(id);
    if (!productImages) {
      throw boom.notFound('user not found');
    }
    this.deleteImage(productImages.url);
    await productImages.destroy();

    return id;
  }

  deleteImage(url) {
    console.log('me llamaron');
    const nameArr = url.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');

    cloudinary.uploader.destroy(public_id);
  }
}

module.exports = ProductImagesService;
