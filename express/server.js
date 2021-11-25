const express = require('express')
const app = express()
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});
require('dotenv').config();
const moment = require('moment');
const uuid = require('uuid');
const cors = require('cors')
const requestify = require('requestify'); 

app.use(bodyParser.json())
app.use(cors())

const Firestore = require('@google-cloud/firestore');
let socketConnection;

const GEO_API_KEY = process.env.GEOAPI_KEY;

io.on('connection', function(socket) {
    console.log('Socket connected.');

    socketConnection = socket;
 
    socket.on('disconnect', function () {
       console.log('Socket disconnected.');
    });
 });

const db = new Firestore({
    projectId: 'outline-70ab6',
    keyFilename: path.resolve(__dirname + '/..', 'keyfile.json'),
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
        eventType: 'visit', // visit | salvation | discipleship
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
        data = {...oldData, ...data, pageViews: oldData.pageViews + 1, returning: true}
        db.collection("data").doc(id).update(data);
    } else {
        const docId = uuid.v4();
        const docRef = db.collection('data').doc(docId);
        await docRef.set(data, { merge: true });
    }

    const { city, latitude, longitude, country_name, country_code  } = await getGeoDataByIp(data.ip);

    socketConnection.emit("add", {
        visitorId: data.vistorID,
        latitude: latitude,
        longitude:longitude,
        countryCode: country_name,
        country: country_code,
        city: city,
        website: data.url,
        timestamp: `${(new Date() / 1000).toFixed(0)}`,
        type: data.eventType,
        gospel: {
            newVisit: ['visit'].includes(data.eventType) ? true : false,
            newSalvation: ['salvation'].includes(data.eventType) ? true : false,
            newDiscipleship: ['discipleship'].includes(data.eventType) ? true : false,
        },
        updateCounters: await getCounters(),
    });
    res.json({ message: 'Successfuly created' });
});

app.get('/api/v1/get', async (req, res) => {
    res.json({ data: await getCounters() })
});

async function getData() {
    const docRef = db.collection('data');
    const data = await docRef.get();
    let collections = [];
    data.forEach(doc => {
        collections = [...collections, doc.data()];
    });
    return collections;
}

async function getCounters() {
    const data = await getData();
    let counters = {
        today: {
            visit: 0,
            salvation: 0,
            discipleship: 0,
        },
        yesterday: {
            visit: 0,
            salvation: 0,
            discipleship: 0,
        },
        all: {
            visit: 0,
            salvation: 0,
            discipleship: 0,
        },
    };

    const todayStartDay = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    const todayEndDay = moment().endOf("day");

    const yesterdayStartDay = moment().subtract(1, 'days').hours(0).minutes(0).seconds(0).milliseconds(0);
    const yesterdayEndDay = moment().subtract(1, 'days').endOf("day");

    data.forEach((item) => {
        const isToday = moment.unix(item.lastViewEnd._seconds).isBetween(todayStartDay, todayEndDay);
        const isYesterday = moment.unix(item.lastViewEnd._seconds).isBetween(yesterdayStartDay, yesterdayEndDay);
        if (isToday) {
            counters = {
                ...counters,
                today: {
                    ...counters.today,
                    [item.eventType]: counters.today[item.eventType] + 1,
                }
            }
        }

        if (isYesterday) {
            counters = {
                ...counters,
                yesterday: {
                    ...counters.yesterday,
                    [item.eventType]: counters.yesterday[item.eventType] + 1,
                }
            }
        }

        counters = {
            ...counters,
            all: {
                ...counters.all,
                [item.eventType]: counters.all[item.eventType] + 1,
            }
        }
    });

    return counters;
}

async function getGeoDataByIp(ip) {
    return await requestify.get(`http://api.ipstack.com/${ip}?access_key=${GEO_API_KEY}`).then(async function(response) {
        return await response.getBody();
    });
}

module.exports = http;
module.exports.handler = serverless(app);