const mongoose = require("mongoose");

const listingScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Listing must have a name."],
    },
    description: {
      type: String,
      required: [true, "Listing must have a description."],
    },
    address: {
      type: String,
      required: [true, "Listing must have a address."],
    },
    regularPrice: {
      type: Number,
      required: [true, "Listing must have a Price."],
    },
    discountPrice: {
      type: Number,
      required: [true, "Listing must have a Price."],
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingScheme);

module.exports = Listing;
