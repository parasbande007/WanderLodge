const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const {ValidateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const ExpressError = require("../util/ExpressError.js");
const Review = require("../models/review.js");
const reviewController = require("../controllers/review.js");



// Reviews
router.post("/", isLoggedIn, ValidateReview, wrapAsync(reviewController.createReview));

//Delete Review Route

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;