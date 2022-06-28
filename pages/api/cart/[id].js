import initDB from "../../../helpers/db";
import cart from "../../../models/cart";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getCart(req, res);
      break;
    
    case "DELETE":
      deleteCart(req, res);
      break;

    case "PUT":
      updateCart(req, res);
      break;
  
    default:
      break;
  }
}

const getCart = (req, res) => {
  const {id} = req.query;
  cart.find({"_id":id})
  .then((cart)=>{
    res.status(200).json(cart);
  })
}

const deleteCart = (req, res) => {
  const {id} = req.query;
  cart.findOneAndRemove({'_id':id})
  .then((cart) => {
    if(cart){
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

const updateCart = (req, res) => {
  const {id} = req.query;
  var cart_update = {
    qty: req.body.qty, 
  }
  cart.findOneAndUpdate({'_id':id}, cart_update)
  .then((cart) => {
    if(cart){
      var message = { success: "product quantity sucessfully updated" };
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