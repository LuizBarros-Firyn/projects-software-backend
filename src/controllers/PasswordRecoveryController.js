const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto');
const { SHA3 } = require('sha3');

const systemMail = process.env.EMAIL;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: systemMail,
      pass: pass
    }
  });

  

module.exports = {
    async create(request, response) {
        const { userEmail } = request.body
        
        try {

            const user = await User.findOne({ email: userEmail });

            if (!user)
                return response.status(400).send({ error: 'Usuário não encontrado' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            const mailOptions = {
                from: systemMail,
                to: userEmail,
                subject: 'Recupere sua senha!!',
                text: `Olá ${user.name}, como vão os negócios?\n\nVimos que você esqueceu sua senha!\n\nNão tem problema, utilize esse token para recupera-la!: \n${token}\n\nVemos você em breve!!`    
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    response.status(400).send({ error: 'Erro ao enviar o e-mail' });
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        } catch (error) {
            response.status(400).send({ error:'Erro ao recuperar a senha, tente novamente mais tarde' });
        }

        return response.status(200).send();
    },

    async update(request, response) {
        const { email, token, password } = request.body;

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

            if (!user)
                return response.status(400).send({ error: 'Usuário não encontrado' });

            if (token !== user.passwordResetToken)
                return response.status(400).send({ error: 'Token incompatível' });

            const now = new Date();

            if (now > user.passwordResetExpires)
                return response.status(400).send({ error: 'Token expirado, gere um novo' });

            const hash = new SHA3(512);

            const encriptedPassword = hash.update(password).digest('hex');

            await User.findByIdAndUpdate(user._id, {
                '$set': {
                    password: encriptedPassword,
                }
            });
        } catch (error) {
            response.status(400).send({error: 'Não foi possível recuperar a senha'});
        }

        return response.status(200).send();
    }
};