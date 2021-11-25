const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const path = require('path');

const uuid = require('uuid');

app.use(bodyParser.json())

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'outline-70ab6',
    keyFilename: path.resolve('keyfile.json'),
});

app.post('/api/v1/add', async (req, res) => {
    let data = {
        vistorID: `${((new Date() * 1) / 1000).toFixed(0)}`,
        ip: req.socket.remoteAddress,
        url: '',
        userAgent: req.get('User-Agent'),
        vendorId: '',
        campaignId: '',
        adId: '',
        serverName: '',
        eventType: 'sitevisit', // sitevisit | salvation | discipleship
        language: req.headers["accept-language"] || 'en',
        referrer: '',
        socialSource: '',
        returning: false,
        lastViewEnd: new Date(),
        pageViews: 0,
    }
    data = {...data, ...req.body}
    
    const finded = await db.collection('data').where('vistorID', '==', req.body.vistorID).get();

    if ( ! finded.empty) {
        let ids = {};
        finded.forEach(item => ids[item.id] = item.data());
        const [id, oldData] = Object.entries(ids).pop();
        db.collection("data").doc(id).update({...oldData, ...data, pageViews: oldData.pageViews + 1, returning: true});
    } else {
        const docId = uuid.v4();
        const docRef = db.collection('data').doc(docId);
        await docRef.set(data, { merge: true });
    }


    res.json({ message: 'Successfuly created' });
});

app.get('/api/v1/get', async (req, res) => {
    const docRef = db.collection('data');
    const data = await docRef.get();
    let collections = [];
    data.forEach(doc => {
        collections = [...collections, doc.data()];
    });

    res.json({ data: collections })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})