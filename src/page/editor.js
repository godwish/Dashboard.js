const Common = require('../Common');

class Page_Editor{
    Process(req, res){
        let page = 
`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>`+Common.Strings.title+`</title>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="public/design.css" type="text/css" />
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
const category_btn_confirm = '`+Common.Strings.category_btn_confirm+`';
const category_btn_cancel = '`+Common.Strings.category_btn_cancel+`';
const site_btn_confirm = '`+Common.Strings.site_btn_confirm+`';
const site_btn_cancel = '`+Common.Strings.site_btn_cancel+`';
const json_data =\``+Common.Setting.site+`\`;
</script>
<script src="public/editor.js"></script>
</head>
<body>
<div id="dialog_category" title="`+Common.Strings.category_edit+`">
  <form>
    <fieldset>
      <label for="name">`+Common.Strings.category_name+`</label>
      <input type="text" name="value_category" id="value_category" value="" class="text ui-widget-content ui-corner-all">
    </fieldset>
  </form>
</div>
<div id="dialog_item" title="`+Common.Strings.site_edit+`">
  <form>
    <fieldset>
      <label for="name">`+Common.Strings.site_name+`</label>
      <input type="text" name="value_item" id="value_item" value="" class="text ui-widget-content ui-corner-all">
      <label for="name">`+Common.Strings.site_url+`</label>
      <input type="text" name="value_url" id="value_url"value="" class="text ui-widget-content ui-corner-all">
    </fieldset>
  </form>
</div>
  <br><center><h1>`+Common.Strings.title+`</h1><br>
  <div class="widget">
    <a class="ui-button ui-widget ui-corner-all" href="#" onclick='InsertPortlet();'>`+Common.Strings.category_add+`</a>
    <a class="ui-button ui-widget ui-corner-all" href="#" onclick='Save();'>`+Common.Strings.save+`</a>
    <a class="ui-button ui-widget ui-corner-all" href="#" onclick='GoHome();'>`+Common.Strings.go_home+`</a>
  </div></center><br>
  <div class="total_frame"></div>
</body>
</html>`;
        res.send(page);
    }
}
module.exports = Page_Editor