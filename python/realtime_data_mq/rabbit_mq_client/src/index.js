const mp = require('./publish/msg_publisher');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/test_get', (req, res)=>{
    return res.status(200).send('Received a GET HTTP method');
});


app.post('/test_post', (req, res)=>{
    // console.log('POST HTTP method req: ',req);
    let body = req.body;
    // console.log('*****body: ',body);
    // return res.send('Received a POST HTTP method...');
    return res.send(body);
});

app.post('/publish_msg', (req,res) => {
    const json_msg = req.body;
    mp.publish_message_to_queue(json_msg);
    return res.send('Message published to queue!!!');
});

const PORT = 8585;
app.listen(PORT, ()=>{
    console.log(`Example app listening on port ${PORT}!`);
});