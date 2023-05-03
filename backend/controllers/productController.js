const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// CREATE A PRODUCT --> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = 5;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productsCount,
  });
});

// UPDATE A PRODUCT --> Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    sucess: true,
    updatedProduct,
  });
});

// Delete A Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }

  await product.findOneAndRemove();

  res.status(200).json({
    sucess: true,
    message: "Product Deleted Sucessfully",
  });
});
