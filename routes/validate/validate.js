const express = require('express');
const router = express.Router();

const { validate } = require('deep-email-validator');



router.post('/', async (req, res) => {
    const emails = req.body.data;
    const proms = emails.map(email => validate(email));

    const results = await Promise.all(proms);
    const validatedEmails = results.map((item, index) => {
        return { ...item, email: emails[index] }
    });

    res.status(200).json({
        data: validatedEmails
    });
});



module.exports = router;
