const express = require("express");
const app = express();
const port = 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    extended: true
}));
require("./routes").init(app)
require("./db").init(app)
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})
