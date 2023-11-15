const Listing = require("../models/listingmodel");

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
