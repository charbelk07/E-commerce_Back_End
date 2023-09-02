const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      // includes its associated Products
      attributes: ["product_name"],
    },
  }).then((categoriesData) => {
    res.json(categoriesData);
  });
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID and include its associated products
    const category = await Category.findByPk(categoryId, {
      include: {
        model: Product, // Include the Product model
        attributes: ["id", "product_name", "price", "stock"], // Specify the attributes you want to retrieve from the Product model
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const newCategory = req.body; // Get the new category data from the request body

    // Create a new category in the database
    const createdCategory = await Category.create(newCategory);

    res.status(200).json(createdCategory); // Respond with the created category
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        // Update fields here
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({ message: "Category updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category's id from the URL parameter

    // Find the category by id
    const category = await Category.findByPk(categoryId);

    if (category === null) {
      return res.status(404).json({ error: "category not found" });
    }

    // Delete the category
    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
