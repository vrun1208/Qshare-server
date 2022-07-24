const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./dbconfig/db');
connectDB();

async function fetchData() {
    const prevDate = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const files = await File.find({createdAt: { $lt: prevDate}});

    if (files.lenght){
        for(const file of files){
            try{
                fs.unlinkSync(file.path);
            await file.remove();
            console.log(`File deleted! ${file.filename}`);
            }catch(err) {
                console.log(`error deleting file ${err}`);
            }
            
        }
    }
    console.log("Done!")
}

fetchData().then(process.exit);