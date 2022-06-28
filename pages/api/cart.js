import initDB from "../../helpers/db";
import cart from "../../models/cart";

initDB();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      getCart(req, res);
      break;

    case "POST":
      postCart(req, res);
      break;

    default:
      break;
  }
}

const getCart = (req, res) => {
  cart.find()
  .then((cart)=>{
    res.status(200).json(cart);
  })
}

const postCart = (req, res) => {
  var newCart = new cart({
    userId: req.body.userId, 
    product: req.body.product,
    qty: req.body.qty,
  })
  newCart.save()
  .then(cart => {
    var message={success:"successfully saved!",data:cart};
    res.status(200).json(message);
  })
  .catch(err => {
    var message = {error:""};
    message.error="Something went wrong!";
    res.status(200).json(message);
  })
}
