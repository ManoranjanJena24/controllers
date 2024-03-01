const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null,title, imageUrl, description, price);
  // product.save().then(() => {
  //   res.redirect('/');
  // }).catch((err) => {
  //   console.log(err);
  // });
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,

  }).then((result) => {
    console.log("Created Product")
    res.redirect('/admin/products')
  }).catch((err) => {
    console.log(err)
  })
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  console.log("insideEdit")
  if (!editMode) {
    return res.redirect('/')
  }
  // console.log("insideEdit")
  const prodId = req.params.id;
  req.user.getProducts({
    where: {id:prodId}
  })
  // Product.findByPk(prodId)
    .then((products) => {
      const product=products[0]
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch((err) => {
    console.log(err)
  })
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle=req.body.title
  const updatedPrice=req.body.price
  const updatedImageUrl=req.body.imageUrl
  const updatedDesc=req.body.description
  Product.findByPk(prodId).then((product) => {
    product.title=updatedTitle
    product.price=updatedPrice
    product.imageUrl=updatedImageUrl
    product.description = updatedDesc
    return product.save();
  }).then((result) => {
    console.log("Updated")
    res.redirect('/admin/products');
  }).catch((err) => {
    console.log(err)
  })
  

}

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//  Product.deleteById(prodId)
//  res.redirect('/admin/products')

// };
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then((product) => {
    return product.destroy();
    
  }).then((result) => {
    console.log("Deleted")
    res.redirect('/admin/products')

  }).catch((err) => {
    console.log(err)
    
  })


};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
    // res.render('admin/products', {
    //   prods: products,
    //   pageTitle: 'Admin Products',
    //   path: '/admin/products'
    // });
  // });
  req.user.getProducts().then((rows) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err) => {
    console.log(err)
  })
};
