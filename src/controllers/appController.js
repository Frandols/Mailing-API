const nodemailer = require('nodemailer');
const controller = {};

controller.list = (req, res, msg) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user', (err, users) => {
            if(err){
                res.json(err);
            }
            res.render('mailer', {
                data: users,
                msg: msg || ''
            })
        });
    });
};
controller.save = (req, res) => {

    var data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO user set ?', [data], (err, user) => {
            res.redirect('/');
        });
    })
}
controller.search = (req, res) => {
    
    var data = req.body.search + '%';
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user WHERE name LIKE ?', [data], (err, users) => {
            if(err){
                res.json(err);
            }
            res.render('mailer', {
                data: users,
                msg: ''
            })
        })
    })
}
controller.send = async (req, res) => {

    // Items
    var user = req.body.name;
    var email = req.body.email;
    var emails = req.body.emails;
    var message = req.body.message;

    // Mail Send
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
    let info = await transporter.sendMail({
        from: email,
        to: emails,
        subject: `${user} te habla desde Francisco De Los Santos Mailing API`,
        text: "Nuevo mensaje...",
        html: message
    }, (err, succ) => {
        if(err){
            controller.list(req, res, 'err');
        }
        else{
            controller.list(req, res, 'succ');
        }
    });
    
}

module.exports = controller;