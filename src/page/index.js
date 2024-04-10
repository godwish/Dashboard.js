const Common = require('../Common');
class Page_Index{
    Process(req, res){
        res.send(`<!doctype html><html><head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>`+Common.Strings.title+`</title>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="public/design.css" type="text/css" />
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        </head><body><br><center><h1>`+Common.Strings.title+`</h1></center><br><div class="total_frame"></div>
<script>const json_data =\``+Common.Setting.site+`\`; </script>
<script src="public/index.js"></script>
        </body></html>`);
    }
}
module.exports = Page_Index;