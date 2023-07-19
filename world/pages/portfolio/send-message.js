export default async (req, user) => {
    await req.db.SendMail.send("wyattsushi@gmail.com", `From: ${req.body.from}`, `<p>Message: ${req.body.message.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`);
}