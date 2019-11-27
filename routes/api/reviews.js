const express = require("express");
const router = express.Router();
const passport = require("passport");

const Review = require("../../models/Review");

// @route GET api/reviews/:id
// @desc Get list of reviews for a specific Prof ID
// @access Private
router.get(
    "/:id",
    // passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      let id = req.params.id;
      let reviewList = [];

      await Review.find({})
                .then(reviews => {
                    reviews.map(review => {
                        if(review.profId == id){
                            reviewList.push(review);
                        }
                    })
                });
        res.json(reviewList);
    }
);

// @route POST api/reviews/professor/:id
// @desc Create a new Review
// @access Public
router.post(
    "/professor/:profId",
    async (req, res) => {
        const review = await new Review({
          profId: req.params.profId,
          name: req.body.name,
          rating: req.body.rating,
          review: req.body.review,
          Goals: req.body.Goals,
          Variety: req.body.Variety,
          Voice: req.body.Voice,
          Exams: req.body.Exams
        });
    
        review
            .save()
            .then(review => res.json(review));
      }

);

module.exports = router;