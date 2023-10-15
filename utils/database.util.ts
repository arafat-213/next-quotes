import mongoose from 'mongoose'

let isConnected = false

export const connect = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: 'quotocean',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error)
    }
}