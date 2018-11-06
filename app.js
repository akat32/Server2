import express from 'express'
import rndstring from 'randomstring'
import bodyParser from 'body-parser'
import path from 'path'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));

import {Users, Emails} from './mongo';
require('./func')

app.listen(3000, ()=>{
  console.log('Server on 3030')
})

require('./routes/auth')(app, Users, Emails, rndstring)
require('./routes/email')(app, Users)
