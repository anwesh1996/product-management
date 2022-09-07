const productController = require("../controller/product.controller");
module.exports.init = (app) => {
    app.get("/",(req,res)=>{
        console.log("Health check");
        res.send("")
    })

    app.post("/product",productController.create)
    app.get("/products",productController.getAll);
}