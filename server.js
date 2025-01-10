const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, phone, service } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const clientMailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Service Booking Confirmation',
        text: `Dear ${name},\n\nThank you for booking ${service}.`
    };

    const ownerMailOptions = {
        from: 'your-email@gmail.com',
        to: 'owner-email@gmail.com',
        subject: 'New Booking',
        text: `Client: ${name}\nPhone: ${phone}\nService: ${service}`
    };

    transporter.sendMail(clientMailOptions);
    transporter.sendMail(ownerMailOptions);

    res.status(200).send('Emails sent');
});

app.listen(3000, () => console.log('Server running on port 3000'));
