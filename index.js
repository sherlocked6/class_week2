const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

function middleware1(req, res, next){
    console.log('from inside middleware' + req.headers.counter);
    res.send('Error inside from middleware')
    //next();
}

//app.use(middleware1);
app.use(bodyParser.json());

function calculateSum(num){
    var counter = 0;
    for(var i=0;i<num;i++){
        counter+=i
    }
    return counter
}

function calculateMul(num){
    var mul = 1;
    for(var i=1;i<=num;i++){
        mul *= i
    }
    return mul
}

function handleFirstRequest(req,res){
    var counter = req.body.counter;
    var calculatedSum = calculateSum(counter);
    var calculatedMul = calculateMul(counter)
    
    var answerObject = {
        sum : calculatedSum,
        mul: calculatedMul
    }
    
    res.status(200).send(answerObject)
}

function createUser(req,res){
    res.send('hello mf')
}

function givePage(req, res){
    //res.send("<head><title>Hello from here</title></head><body><b>Look here B</b></body>")
    res.sendFile(__dirname + "/index.html")
}

app.get('/', givePage)

app.get('/handleFirstRequest', handleFirstRequest)
//app.post('/', handleFirstRequest)
app.post('/createuser', createUser)


app.get('/user', (req,res) => {
    const name = req.query.name
    const age = req.query.age
    res.send(`Hello ${name} person. I think your age is ${age}`)
})

function started(){
    console.log(`Example app listening on port ${port}`)
}

app.listen(port, started)



