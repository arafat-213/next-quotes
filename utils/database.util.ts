import mongoose from 'mongoose'

let isConnected = false

export const connect = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('MongoDB connection established')
    } catch (error) {
        console.log('db error', error)
    }
}