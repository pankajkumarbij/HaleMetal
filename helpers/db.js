import mongoose from 'mongoose';

export default function initDB() {
  if(mongoose.connections[0].readyState){
    console.log("Database Connected Already");
    return;
  }
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on('connected', () => {
    console.log('Database Connected Successfully');
  })
  mongoose.connection.on('error', (err) => {
    console.log(err, 'Database Connection Failed');
  })
}