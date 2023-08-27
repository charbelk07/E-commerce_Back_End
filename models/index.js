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
Category.belongsToMany(Tag, {
  through: {
    model: Tag,
    unique: false,
    as: "category_tag",
  },
}),
  // Products belongToMany Tags (through ProductTag)
  Product.belongsToMany(Tag, {
    through: {
      model: ProductTag,
      unique: false,
    },
  }),
  // Tags belongToMany Products (through ProductTag)
  Tag.belongsToMany(ProductTag, {
    through: {
      model: ProductTag,
      unique: false,
    },
  });
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
