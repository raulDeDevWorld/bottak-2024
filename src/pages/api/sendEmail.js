const nodemailer = require('nodemailer');

export default function handler(req, res) {
    console.log(req.body.data)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "info.bottak@gmail.com",
            pass: "jfqt lhab kpwz lmza",
        },
    });

    async function handlerSendEmail() {
        try {
            await transporter.sendMail({
                from: 'info.bottak@gmail.com',
                to: req.body.email,
                subject: ` Reporte de ${req.body.operacion}: ${req.body.estado}`,
                // text: req.body.data,
                html: req.body.data,

                // attachments: [
                //     {
                //         filename: `Cotizacion_${req.body.element}.pdf`,
                //         content: req.body.pdfBase64.split("base64,")[1],
                //         encoding: 'base64'
                //     }
                // ]
            });
            return res.json({ msg: 'Send Email SuccessFull' })
        } catch (err) {
            console.log(err)
            return res.json({ msg: `error ${err}` })
        }
    }

    handlerSendEmail()
}