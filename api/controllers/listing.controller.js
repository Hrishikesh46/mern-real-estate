const Listing = require("../models/listingmodel");
const ErrorHandler = require("../utils/error");

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    console.log(listing);
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(ErrorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(ErrorHandler(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("User listing deleted successfully");
  } catch (err) {
    next(err);
  }
};

exports.updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(ErrorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(ErrorHandler(401, "You can only delete your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
};
