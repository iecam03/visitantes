const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost:27017/test', {
useNewUrlParser: true, useUnifiedTopology: true});

 
var visitorSchema= mongoose.Schema ({
  
    date: { type: Date },
    name: String,
  });
  const Visitor = mongoose.model("Visitors",visitorSchema);

  let dateString = Date();
  let good = "El visitante fue almacenado con exito";


app.get('/', (req, res) => {
    var name = req.query.name;
    console.log(name);
    if(!name){
       name = 'Anónimo';
    } else {
       name = name
    }

  const person = new Visitor({
      date: dateString,
      name: name,
  });

  person.save((error) => {
    if (error) {
        return res.send("error");
  }

  return res.send(`<h1>${good}</h1>`)
 });

});





app.listen(3000, () => console.log('Listening on port 3000!'));






