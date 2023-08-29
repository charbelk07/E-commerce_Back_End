// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  OnDelete: "CASCADE",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // through: {
  //   model: ProductTag,
  //   unique: false,
  //   foreignKey: "product_id",
  // },
  through: ProductTag,
  foreignKey: "product_id",
}),
  // Tags belongToMany Products (through ProductTag)
  Tag.belongsToMany(Product, {
    through: ProductTag,
    unique: false,
    foreignKey: "tag_id",
  });
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
