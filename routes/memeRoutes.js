const express = require("express");

const router = express.Router();

const {
  getAllMemes,
} = require("../controllers/memeController.js");

/**
 * Get all memes
 * @route GET /memes
 * @group memes API - Endpoints for managing memes
 * @returns {object} 200 - An list of memes
 * @returns {Error}  default - Unexpected error
 */
router.get("/memes", getAllMemes);

module.exports = router;
