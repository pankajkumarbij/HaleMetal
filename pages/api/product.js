import initDB from "../../helpers/db";
import product from "../../models/product";

initDB();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;

    case "POST":
      postProduct(req, res);
      break;

    default:
      break;
  }
}

const getProduct = (req, res) => {
  product.find()
  .then((product)=>{
    res.status(200).json(product);
  })
}

const postProduct = (req, res) => {
  var newProduct = new product({
    category: req.body.category, 
    productName: req.body.productName,
    unit: req.body.unit,
    price: req.body.price,
    size: req.body.size,
    material: req.body.material,
    brand: req.body.brand,
    min_qty: req.body.min_qty,
    others: req.body.others
  })
  newProduct.save()
  .then(product => {
    var message={success:"successfully saved!",data:product};
    res.status(200).json(message);
  })
  .catch(err => {
    var message = {error:""};
    if( err.code=="11000" && Object.keys(err.keyValue)[0] == "product"){
      message.error="product already exist!";
    }
    if(Object.keys(err.errors)[0]=="product")
    {
      message.error=err.errors.product.properties.message;
    }
    else{
      message.error="Something went wrong!";
    }
    res.status(200).json(message);
  })
}
