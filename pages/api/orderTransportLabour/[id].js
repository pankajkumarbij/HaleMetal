import initDB from "../../../helpers/db";
import order from "../../../models/order";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "PUT":
      updateOrder(req, res);
      break;
  
    default:
      break;
  }
}

const updateOrder = (req, res) => {
  const {id} = req.query;
  var order_update = {
    vehicleType: req.body.vehicleType,
    vehicleNumber: req.body.vehicleNumber,
    driverName: req.body.driverName,
    driverMobile: req.body.driverMobile,
    transportCharge: req.body.transportCharge,
    labourCharge: req.body.labourCharge 
  }
  order.findOneAndUpdate({'_id':id}, order_update)
  .then((order) => {
    if(order){
      var message = { success: "order sucessfully updated" };
      res.json(message);
    }else{
      var message = { error: "order not found" };
      res.json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = {error:"Something went wrong!", success: false, err: err };
    res.json(message);
  })
}