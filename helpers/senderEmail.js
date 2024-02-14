const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sendGrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const email = {...data, from: "sanya.prokopev95@gmail.com"};
    await sendGrid.send(email);
    return true
}

module.exports = { sendEmail }

