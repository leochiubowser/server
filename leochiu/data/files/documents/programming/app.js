const express = require("express")

const app = express()

app.get("/.well-known/pki-validation/E9AD13C878A00856165717FA2E84CC17.txt", (req, res) => {
    res.sendFile(__dirname + "/E9AD13C878A00856165717FA2E84CC17.txt")
})


app.listen(80)