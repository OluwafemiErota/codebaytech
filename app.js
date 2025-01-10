const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'oneschool-master')));


// Serve the index.html file at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'oneschool-master', 'index.html'));
});

// Serve the index.html file at the root URL
app.post("/just-gee-form", (req, res) => {
    const { formData, referenceId } = req.body;

    // Create transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email content
    const mailOptions = {
        from: formData.email,
        to: "codebaytech24@gmail.com",
        subject: "Admission Signup",
        text: `
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Gender: ${formData.gender}
            Date of Birth: ${formData.dob}
            Email: ${formData.email}
            Phone Number: ${formData.phone}
            Country: ${formData.country}
            City of Residence: ${formData.city}
            How did you hear about us?: ${formData.referralSource}
            interested course: ${formData.courseOfChoice}
            Reference ID: ${referenceId} 
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.json({ success: false });
        } else {
            console.log("Email sent:", info.response);
            res.json({ success: true });
        }
    });
});


// Serve the payment.html file when /payment is accessed
app.get("/payment", (req, res) => {
    res.sendFile(path.join(__dirname, 'oneschool-master', 'payment.html'));
});

// Error logging middleware
const errorLogger = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    next(err);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};

// Apply error logging and error handler middleware
app.use(errorLogger);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
