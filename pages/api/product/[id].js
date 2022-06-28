import initDB from "../../../helpers/db";
import product from "../../../models/product";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;
    
    case "DELETE":
      deleteProduct(req, res);
      break;

    case "PUT":
      updateProduct(req, res);
      break;
  
    default:
      break;
  }
}

const getProduct = (req, res) => {
  const {id} = req.query;
  product.find({"_id":id})
  .then((product)=>{
    res.status(200).json(product);
  })
}

const deleteProduct = (req, res) => {
  const {id} = req.query;
  product.findOneAndRemove({'_id':id})
  .then((product) => {
    if(product){
      var message = { success: "product sucessfully removed" };
      res.status(200).json(message);
    }else{
      var message = { error: "product not found" };
      res.status(200).json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = { success: false, err: err };
    res.status(200).json(message);
  })
}

const updateProduct = (req, res) => {
  const {id} = req.query;
  var product_update = {
    category: req.body.category, 
    productName: req.body.productName,
    unit: req.body.unit,
    price: req.body.price,
    size: req.body.size,
    material: req.body.material,
    brand: req.body.brand,
    min_qty: req.body.min_qty,
    others: req.body.others
  }
  product.findOneAndUpdate({'_id':id}, product_update)
  .then((product) => {
    if(product){
      var message = { success: "product sucessfully updated" };
      res.json(message);
    }else{
      var message = { error: "product not found" };
      res.json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = {error:"Something went wrong!", success: false, err: err };
    res.json(message);
  })
}