const fs = require('fs')
const Common = require('../Common')
const Util = require('../Module/Util')
class Api_Save{
    Process(req, res){
        let str = JSON.stringify(req.body);
        Common.Setting.site = str;
        fs.writeFileSync('data/sites.json',str)
        fs.writeFileSync('backup/'+Util.getCurrentDate()+'.json',str)
        res.send('0');
    }
}
module.exports = Api_Save