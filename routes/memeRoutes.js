const express = require("express");

const router = express.Router();

const {
  getAllMemes,
  getMemesById,
  createMeme,
} = require("../controllers/memeController.js");

/**
 * Get all memes
 * @route GET /memes
 * @group memes API - Endpoints for managing memes
 * @returns {object} 200 - An list of memes
 * @returns {Error}  default - Unexpected error
 */
router.get("/memes", getAllMemes);

// /**
//  * Get material by Id
//  * @route GET /memes/{id}
//  * @group memes API - Endpoints for managing memes
//  * @param {string} id.path.required
//  * @returns {object} 200 - A dictionary of specified material
//  * @returns {Error}  default - Unexpected error
//  */
// router.get("/memes/:id", getMemesById);

router.post("/memes", createMeme);

module.exports = router;
