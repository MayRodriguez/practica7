const express = require("express");

const server = express();
server.use(express.json());
const fs = require('fs');

let data = fs.readFileSync('koders.json');
let koderJson = JSON.parse(data);

server.get("/koders", (req, res) => {
    res.json(koderJson)
})

server.post("/koders/", (req, res) => {
    const newKoder = req.body;
    koderJson.push(newKoder);
    res.json({message:"koder added", koderJson,})
})

server.delete("/koders/:name", (req, res) => {
    const koderExists = koderJson.find(
        (koder) => koder.name === req.params.name
    );
    if(!koderExists) {
        res.status(404);
        res.json({message:"koder not found"})
        return;
    }
    const newKoders = koderJson.filter(
        (koder) => koder.name !== req.params.name
    );
    koderJson = newKoders
    res.json({message: "koder deleted",koderJson})
})
server.delete("/koders", (req, res) => { 
    koderJson = []
    res.json({message: "All koders deleted",koderJson})
})

// server.get("/hola", (request, response) => {
//     response.end("Hola desde express");
// })
// server.post("/hola", (request, response) => {
//     // response.status(200) //=== el 200 va por default =====
//     response.json({message:"hola desde post"})
// })
// server.get("/", (request, response) => {
//     response.writeHead(200, {"Content-Type":"application/json"})
//     response.end(JSON.stringify({message:"Hola"}))
// })
// server.get('/hola/:nombre', (request, response) => {
//     response.json({message:`Hola, ${request.params.nombre}`})
// });

server.listen(8080, () => {
    console.log("server listening on port 8080")
})