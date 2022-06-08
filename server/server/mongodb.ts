import mongoose from 'mongoose'
import 'dotenv/config'

const mongo = async (url: any) =>{
    await mongoose.connect(url)
    console.log('Connected to DB')
}

export default mongo