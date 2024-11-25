import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number,
}
const connection: ConnectionObject = {}

const dbConnect = async (): Promise<void>=>{
    if(connection.isConnected){
        console.log("Database is already connected");
        return;
    }else{
        try {
            const response = await mongoose.connect(process.env.MONGODB_URI + "/" + "next-auth")
                console.log("Database connected", response.connections[0].port)
                connection.isConnected = response.connections[0].readyState
        
    } catch (error) {
        console.log(`Failed to connect with the database ${error}`)
        process.exit(1)
    }
}
}

export default dbConnect;