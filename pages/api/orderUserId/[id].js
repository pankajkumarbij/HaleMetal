import initDB from "../../../helpers/db";
import order from "../../../models/order";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getOrder(req, res);
      break;
  
    default:
      break;
  }
}

const getOrder = (req, res) => {
  const {id} = req.query;
  order.find({"userId":id})
  .then((order)=>{
    res.status(200).json(order);
  })
}
