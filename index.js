const app = require("./app");

let PORT = 5500;

app.listen(PORT, ()=>{
    console.log("Server running on " + PORT)
})