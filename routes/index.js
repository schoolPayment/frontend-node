let express = require('express');
const grpc = require('grpc')
let router = express.Router();

let PROTO_PATH = 'routes/message.proto'
const serviceDef = grpc.load(PROTO_PATH);

const port = 8080
const client = new serviceDef.com.brianphiri.grpc.PaymentService(`localhost:${port}`, grpc.credentials.createInsecure());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/create',function(req,res,next){
  
  // res.render('index');
  var payment = { phoneNumber: req.body['phoneNumber'], amount: req.body['amount'], studentNumber: req.body['studentNumber'] }
  
  client.makePayment(payment, function (error, response) {
        if (error)
              console.log('Error: ', error);
          else
              console.log(response);
  });
  res.render('index')
})

module.exports = router;
