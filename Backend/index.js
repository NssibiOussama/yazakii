const express = require('express')
const app = express()
const morgan = require('morgan')
const http = require('http');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const body_parser = require('body-parser')
const authRouter = require('./Routes/auth')
const materielRouter = require('./Routes/materiel')
const userRouter = require('./Routes/user')
const mdpRouter =require('./Routes/mdp')
const demandeRouter =require('./Routes/demande')
const departementRouter =require('./Routes/departements')
const roleRouter =require('./Routes/role')
const demandeLigneInternetRouter =require('./Routes/demandeLigneInternet')
const demandePcRouter =require('./Routes/demandePcController')
const demandePcProvisoireRouter =require('./Routes/pcProvisoire')










app.use(express.json())
app.use(body_parser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});



app.use('/api', authRouter);
app.use('/materiel',materielRouter)
app.use('/user',userRouter)
app.use('/api/mdp',mdpRouter)
app.use('/demande',demandeRouter)
app.use('/departement',departementRouter)
app.use('/role',roleRouter)
app.use('/demandeLigneInternet',demandeLigneInternetRouter)
app.use('/demandePc',demandePcRouter)
app.use('/demandePcProvisoire',demandePcProvisoireRouter)

app.get('/generateQR', async (req, res) => {
  try {
    const { text } = req.query;
    const qrCodeImage = await QRCode.toDataURL(text);
    // res.set('Content-Type', 'image/png');
    res.status(200).json(qrCodeImage);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint for scanning and checking a QR code
app.post('/scanQR', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const image = await Jimp.read(imageUrl);
    const qrCode = await new Promise((resolve, reject) => {
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK, (err, font) => {
        if (err) {
          reject(err);
        } else {
          const qrCode = new QRCodeDecoder().decodeFromImage(image.bitmap, {
            inversionAttempts: 'dontInvert',
          });
          resolve(qrCode);
        }
      });
    });
    res.json({ qrCode });
  } catch (err) {
    res.status(500).send(err);
  }
});



const server = http.createServer(app)
const port = process.env.port || 3000
server.listen(port, () => console.log("App working on port" + port + "..."))  