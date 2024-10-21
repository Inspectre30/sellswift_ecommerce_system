import mongoose from "mongoose";

const connectDb = async () => {
   
    mongoose.connection.on("connected", ()=> {
        console.log("DB connected :>")
    })
     // eslint-disable-next-line no-undef
    await mongoose.connect(`${process.env.MONGODB_URI}/sellswift_e_commerce)`)
};

export default connectDb;