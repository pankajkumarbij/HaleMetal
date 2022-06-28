import initDB from "../../../helpers/db";
import order from "../../../models/order";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getOrder(req, res);
      break;
    
    case "DELETE":
      deleteOrder(req, res);
      break;
  
    default:
      break;
  }
}

const getOrder = (req, res) => {
  const {id} = req.query;
  order.find({"_id":id})
  .then((order)=>{
    res.status(200).json(order);
  })
}

const deleteOrder = (req, res) => {
  const {id} = req.query;
  order.findOneAndRemove({'_id':id})
  .then((order) => {
    if(order){
      var message = { success: "order sucessfully removed" };
      res.status(200).json(message);
    }else{
      var message = { error: "order not found" };
      res.status(200).json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = { success: false, err: err };
    res.status(200).json(message);
  })
}