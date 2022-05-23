const mongoose = require('mongoose')

const mongo = async (url) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongo