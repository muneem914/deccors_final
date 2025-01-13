import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
      maxLength: [200, "Product length cannot exceed 200 character"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [5, "Product price cannot exceed 5 digit"],
    },
    size: {
      type: String,
    },
    style: {
      type: String,
      required: [true, "please enter product style"],
      enum: {
        values: ["Classic", "Floral", "Modern", "Wood Grain", "Other"],
        message: "please enter proper style",
      },
    },
    material: {
      type: String,
      required: [true, "please enter product material"],
      enum: {
        values: [
          "Metal",
          "Wooden",
          "Plastic",
          "Glass",
          "Steel",
          "Leather",
          "Cotton",
          "Ceramic",
          "Printed Glass",
          "Other",
        ],
        message: "please enter proper material",
      },
    },
    weight: {
      type: String,
    },
    category: {
      type: [String],
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "Cupboard",
          "Decorative",
          "Designer Furniture",
          "Dining",
          "Furniture",
          "Lamps & Lighting",
          "Living Room Furniture",
          "Modern Light",
          "Modular Kitchen",
          "Room Set",
          "Tea Tables",
          "Other",
        ],
        message: "Please enter proper category",
      },
    },
    description: [
      {
        designs: {
          type: String,
          required: [true, "please enter designs under description"],
        },
        specifications: {
          type: String,
        },
        features: {
          type: String,
        },
        _id: false,
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    seller: {
      type: String,
    },
    stock: {
      type: Number,
      required: [true, "please add product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    optional: {
      type: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
