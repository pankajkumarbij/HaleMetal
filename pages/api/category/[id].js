import initDB from "../../../helpers/db";
import category from "../../../models/category";

initDB();

export default (req, res) => {

  switch (req.method) {
    case "GET":
      getCategory(req, res);
      break;
    
    case "DELETE":
      deleteCategory(req, res);
      break;

    case "PUT":
      updateCategory(req, res);
      break;
  
    default:
      break;
  }
}

const getCategory = (req, res) => {
  const {id} = req.query;
  category.find({"_id":id})
  .then((category)=>{
    res.status(200).json(category);
  })
}

const deleteCategory = (req, res) => {
  const {id} = req.query;
  category.findOneAndRemove({'_id':id})
  .then((category) => {
    if(category){
      var message = { success: "category sucessfully removed" };
      res.status(200).json(message);
    }else{
      var message = { error: "category not found" };
      res.status(200).json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = { success: false, err: err };
    res.status(200).json(message);
  })
}

const updateCategory = (req, res) => {
  const {id} = req.query;
  var category_update = {
    category: req.body.category,
  }
  category.findOneAndUpdate({'_id':id}, category_update)
  .then((category) => {
    if(category){
      var message = { success: "category sucessfully updated" };
      res.json(message);
    }else{
      var message = { error: "category not found" };
      res.json(message);
    }
  }).catch(err => {
    console.log(err);
    var message = {error:"Something went wrong!", success: false, err: err };
    res.json(message);
  })
}