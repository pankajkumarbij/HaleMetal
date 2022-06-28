import initDB from "../../helpers/db";
import category from "../../models/category";

initDB();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      getCategory(req, res);
      break;

    case "POST":
      postCategory(req, res);
      break;

    default:
      break;
  }
}

const getCategory = (req, res) => {
  category.find()
  .then((category)=>{
    res.status(200).json(category);
  })
}

const postCategory = (req, res) => {
  var newCategory = new category({category: req.body.category})
  newCategory.save()
  .then(category => {
    var message={success:"successfully saved!",data:category};
    res.status(200).json(message);
  })
  .catch(err => {
    var message = {error:""};
    if( err.code=="11000" && Object.keys(err.keyValue)[0] == "category"){
      message.error="category already exist!";
    }
    if(Object.keys(err.errors)[0]=="category")
    {
      message.error=err.errors.category.properties.message;
    }
    else{
      message.error="Something went wrong!";
    }
    res.status(200).json(message);
  })
}
