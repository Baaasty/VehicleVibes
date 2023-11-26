const db = require('../models');
const config = require('../config/auth.config');
const mailConfig = require('../config/mail.config');
const User = db.User;
const transporter = require('../mail');

const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const verficationToken = Math.floor(100000 + Math.random() * 900000);

  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      verficationToken: verficationToken,
    });

    const result = user.setRoles([1]);

    if (result) {
      res.send({ message: 'Verification email sent. Please check your email for the verification code.' });

      transporter.sendMail({
        from: mailConfig.auth.user,
        to: req.body.email,
        subject: 'VehicleVibes » Account Verification',
        text: `Hello ${req.body.username},\n\nYour verification code is ${verficationToken}.\nhttps://vehiclevibes.de/verify?email=${req.body.email}&token=${verficationToken}\n\nThank you,\nVehicleVibes-Team`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik&family=Rubik+Mono+One&display=swap');

    body {
      font-family: 'Rubik', sans-serif;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      border-radius: 8px;
    }

    .header {
      background-color: #fff8d3;
      text-align: center;
      padding: 15px 0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .header h2 {
      margin: 0;
      color: #333;
    }

    .footer {
      background-color: #fff8d3;
      text-align: center;
      padding: 15px 0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .footer p {
      margin: 0;
      color: #333;
    }

    .footer a {
      color: #333;
      text-decoration: none;
      font-weight: bold;
    }

    @media screen and (max-width: 600px) {
      .email-content {
        margin: 10px auto;
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>VehicleVibes Account Verification</h2>
  </div>
  <p>Hello ${req.body.username},</p>
  <p>Your verification code is ${verficationToken}. Click <a href="http://localhost:5173/verify?email=${req.body.email}&token=${verficationToken}">here</a> to verify your account.</p>
  <p>Thank you, VehicleVibes-Team</p>
  
  <div class="footer">
    <p>&copy; 2023 VehicleVibes. All rights reserved.</p>
    <p>Visit our website: <a href="https://vehiclevibes.de">VehicleVibes</a></p>
  </div>
</body>
</html>
        `,
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.username }],
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'Username not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    if (!user.verified) {
      return res.status(401).send({
        message: 'Account not verified!',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 60 * 24 * 7, // 7 days
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push('ROLE_' + roles[i].name.toUpperCase());
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    console.log(req.body);

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).send({ message: 'User not found.' });

    if (user.verified) return res.status(400).send({ message: 'Account already verified.' });

    if (user.verficationToken != req.body.token)
      return res.status(400).send({ message: 'Invalid verification token.' });

    user.verified = true;
    user.verficationToken = null;
    user.save();

    return res.status(200).send({ message: 'Account verified!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
