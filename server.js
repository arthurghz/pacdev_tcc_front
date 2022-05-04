const express = require('express');
const path = require('path')
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static(_dirname+ '/dist/pacdev-front'));

app.get('/*', (req, res)=>{
    res.sendFile(__dirname + '/dist/pacdev-front/index.html');
});

app.listen(PORT, ()=>{
    console.log('Servidor iniciado na porta' + PORT);
});