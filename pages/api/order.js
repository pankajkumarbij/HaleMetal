import initDB from "../../helpers/db";
import order from "../../models/order";

initDB();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      getOrder(req, res);
      break;

    case "POST":
      postOrder(req, res);
      break;

    default:
      break;
  }
}

const getOrder = (req, res) => {
  order.find()
  .then((order)=>{
    res.status(200).json(order);
  })
}

const postOrder = (req, res) => {
  var newOrder = new order({
    userId: req.body.userId, 
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    pinCode: req.body.pinCode,
    address: req.body.address,
    landmark: req.body.landmark,
    district: req.body.district,
    state: req.body.state,
    country: req.body.country,
    status: req.body.status,
    payment_status: req.body.payment_status,
    product: req.body.product,
    razorpay_payment_id: req.body.razorpay_payment_id,
    razorpay_order_id: req.body.razorpay_order_id,
    razorpay_signature: req.body.razorpay_signature,
    amount: req.body.amount,
  })
  newOrder.save()
  .then(order => {
    var message={success:"successfully saved!",data:order};
    res.status(200).json(message);
  })
  .catch(err => {
    var message = {error:""};
    message.error="Something went wrong!";
    res.status(200).json(message);
  })
}
