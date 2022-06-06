import mongo from "./mongodb"

import 'dotenv/config'
import "dotenv-defaults/config"

const env = process.env; 

const url = `${env.DB_PROTOCOL}${env.DB_USERNAME}:${env.DB_PASSWORD}${env.DB_CLUSTER}.mongodb.net/${env.DB_NAME}${env.DB_PARAMETERS}`;


const main = async () => {
  await mongo(url)
  require('./socket')
  require('./app')
  require('./http')
}

main()

// import './socket'
// import './app'
// import './http'