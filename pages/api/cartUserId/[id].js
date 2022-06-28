import initDB from "../../../helpers/db";
import cart from "../../../models/cart";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getCart(req, res);
      break;
  
    default:
      break;
  }
}

const getCart = (req, res) => {
  const {id} = req.query;
  cart.find({"userId":id})
  .then((cart)=>{
    res.status(200).json(cart);
  })
}
