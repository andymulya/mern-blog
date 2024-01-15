import mongoose from 'mongoose'

async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            autoIndex: true
        })
        console.log("Connected to mongodb")
    }catch(err){
        if(err) throw err
    }
}

export default connect