const express = require("express")
const connectDB = require('./config/conDB');
const {app} = require('./index');
const port = process.env.PORT || '3000'


const init = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)})
  }
  
  init();