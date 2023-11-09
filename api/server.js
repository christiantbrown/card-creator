const PORT = 3001

console.log("Server Running")

const Card = require('./models/Card')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')//our storage manager (i think)
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/images',express.static('../images'))//this lets us make get requests to the images folder to directly pull images

mongoose.connect('mongodb://127.0.0.1:27017/CardGame', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Mongoose Connected")).catch(console.error)

const storage = multer.diskStorage({//we pass this an object with {destination: (req,file,cb)=>{}}
    destination: (req,file,cb)=>{//multer is going to pass this a request, a file object, and a callback (cb), we want to give the destination to the callback function
        cb(null,'../images')//return null on error, dest otherwise
    },
    filename:(req,file,cb)=>{
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 10000000)//generating random-ish characters
        newFileName = uniquePrefix + path.extname(file.originalname)//path.extname gets the file extension
        // console.log(file)
        cb(null,newFileName)//random-ish characters + file extension
    }
})
const upload = multer({storage:storage})//now we have created middleware (yay)




app.listen(PORT,(err)=>{
    console.log(err ? err : `Listening on Port ${PORT}`)
})

app.get('/ping', (req,res)=>{
    console.log(`Ping sent from ${req.socket.remoteAddress}`)
    res.send('Ping Received')
})



app.post('/test-image-upload', upload.single("image"), (req,res)=>{
    console.log(req.file.filename)
    res.send(`new filename ${req.file.filename}`)
})

app.delete('/wipe', async (req,res)=>{
    const deleted = await Card.deleteMany({_id:{$exists : true}})
    res.send(`${deleted.deletedCount} deleted`)
    console.log("Wipe Complete")
})






app.post("/save-new-card", upload.single("image"), (req,res)=>{
    console.log("post request received")


    console.log("req.file: " + req.file)

    newFileName=req.file.filename
    const card = new Card({
        image:newFileName,
        hp:req.body.hp,
        atk:req.body.atk,
        color:req.body.color,
        name:req.body.name
    })
    card.save()
    console.log(`new card ${card}`)
    res.send("Card Uploaded (maybe!)")
})

app.get("/test-get-posts", async (req,res)=>{
    const cards =  await Card.find()
    res.json(cards)
})


app.delete("/delete/:name", async(req,res)=>{
    const deleted = await Card.deleteMany({name:req.params.name})
    res.send(deleted.deletedCount + " Deleted")
})


app.get("/view-card/:name", async(req,res)=>{
    console.log(`received request for ${req.params.name}`)
    const cards = await Card.find({name:req.params.name})
    console.log(cards)
    res.json(cards)
})
