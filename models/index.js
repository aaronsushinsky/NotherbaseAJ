const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("hi");
})


app.listen(4337, function() {
    
});