const Brand = require("../db/brands");

async function getBrands() {
  let brands = await Brand.find();
  return brands.map((brand) => brand.toObject());
}

async function getBrandById(id) {
  let brand = await Brand.findById(id);
  return brand.toObject();
}

async function addBrand(brand) {
  let newBrand = new Brand({
    name: brand.name,
  });
  await newBrand.save();
  return newBrand.toObject();
}

async function updateBrand(id, brand) {
  await Brand.findOneAndUpdate({ _id: id }, brand);
  return;
}

async function deleteBrand(id) {
  await Brand.findByIdAndDelete(id);
}

module.exports = {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
};
