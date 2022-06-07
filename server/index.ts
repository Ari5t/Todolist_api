import mongo from "./mongodb"

import 'dotenv/config'
import "dotenv-defaults/config"

const env = process.env;

const url = new URL(`${env.DB_PROTOCOL}://${env.DB_HOSTNAME}/`)

url.username = env.DB_USERNAME ?? ''
url.password = env.DB_PASSWORD ?? ''
url.port = env.DB_PORT ?? ''
url.pathname = env.DB_NAME ?? ''
url.search = env.DB_PARAMETERS ?? ''

const main = async () => {
  await mongo(url.toString())
  await import('./socket')
  await import('./app')
  await import('./http')
}

main()