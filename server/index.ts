import mongo from "./mongodb"

import 'dotenv/config'
import "dotenv-defaults/config"

const url = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME }:${process.env.DB_PASSWORD}${process.env.DB_CLUSTER }.mongodb.net/${process.env.DB_NAME }${process.env.DB_PARAMETERS}`;

const main = async () => {
    await mongo(url)
    require('./socket')
    require('./app')
    require('./http')
  }
  
  main()