const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // This specifies the intermediate model for the many-to-many relationship
          as: "products", // This alias allows you to access products associated with each tag
        },
      ],
    });

    // Send the tags with associated products as the response
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tags with products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;

    // Find a single tag by its `id` and include its associated Product data
    const tag = await Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
          through: ProductTag, // This specifies the intermediate model for the many-to-many relationship
          as: "products", // This alias allows you to access products associated with the tag
        },
      ],
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Send the tag with associated products as the response
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tag with products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tag_name } = req.body; // Assuming the request body contains a "tag_name" property

    // Create a new tag
    const newTag = await Tag.create({
      tag_name,
    });

    // Send the newly created tag as the response
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create a new tag" });
  }
});

// Update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const { tag_name } = req.body; // Assuming the request body contains a "tag_name" property
    const tagId = req.params.id; // Get the tag's id from the URL parameter

    // Find the tag by id
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    // Update the tag's name
    await tag.update({ tag_name });

    // Send the updated tag as the response
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the tag" });
  }
});

// Delete a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagId = req.params.id; // Get the tag's id from the URL parameter

    // Find the tag by id
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    // Delete the tag
    await tag.destroy();

    // Send a success message as the response
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the tag" });
  }
});

module.exports = router;
