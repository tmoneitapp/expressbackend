const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const programmingLanguagesRouter = require("./routes/programmingLanguages");
const corsOptions ={
  origin: function(origin, callback){
    if (whitelist.indexOf(origin)!==-1){
      callback(null,true)
    }
    else{
      callback(null,true) //trick CORS
    }
  },
  credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/programming-languages", programmingLanguagesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.header('Access-Control-Allow-Origin','http://app-single-repository.apps.ocp.tmrnd.com.my');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');

  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});