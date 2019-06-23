var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade'); 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render('index',{title: "Welcome"});
    // res.send('<h1>Hello World!</h1>');
    // console.log('Hello World!');
});

app.get('/about',function(req,res){
    res.render('about');
});

app.get('/contact',function(req,res){
    res.render('contact');
});

app.post('/contact/send',function(req,res){
    // console.log('Test');
    var tarnsporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'i@gmail.com',
            pass: ''
        }
    });


    var mailOptions = {
        from: 'inafs <i@gmail.com>',
        to: 'pankaj nafria <pankaj.nafria@gmail.com>',
        subject: 'Website Submission',
        text: 'You have a submission with the following deatils... Name: '+ req.body.name+ ' Email: ' +req.body.email+ ' Message: ' + req.body.message,
        html: '<p>You have a submission with the following deatils...</p><br><ul><li>Name: '+ req.body.name +'</li><li>Email: '+req.body.email+' </li><li> Message: '+req.body.message+'</li></ul>'
    };

    tarnsporter.sendMail(mailOptions,function(error,info){
        if(error)
        {
            console.log(error);
            res.redirect('/');
        }else
        {
            console.log('Message Sent : '+info.response);
            res.redirect('/');
        }
    });
});


app.listen(3000);
console.log('Server is running on port 3000...');