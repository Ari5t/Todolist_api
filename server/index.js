const mongo = require('./mongo')

const main = async () => {
  mongo('mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority')

  // require('./app')

  // require('../listener')

  // require('./http')
  require('./socket')
}

main()