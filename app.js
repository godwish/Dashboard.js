const express = require('express')
const app = express()
const fs = require('fs')
const Common = require('./src/Common');
const Page_Index = require('./src/page/index')
const Page_Editor = require('./src/page/editor')
const Api_Save = require('./src/api/save')
const pg_index = new Page_Index();
const pg_editor = new Page_Editor();
const api_save = new Api_Save();

Common.Setting = JSON.parse(fs.readFileSync('data/setting.json','utf8'));
Common.Strings = JSON.parse(fs.readFileSync('data/Locales/'+Common.Setting.language+'.json','utf8'));
Common.Setting.site = fs.readFileSync('data/sites.json','utf8');
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));
app.use(express.raw());
app.use(express.text());
app.use('/public',express.static('public'));
app.get('/', pg_index.Process);
app.get('/editor', pg_editor.Process);
app.post('/api/save', api_save.Process);
app.listen(Common.Setting.port,function() {console.log('Start Server('+Common.Setting.port+')')})