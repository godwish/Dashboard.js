var dialog_category;
var dialog_item;
var obj_modify_category;
var obj_modify_item;
var is_drag = false;
var time_push = 0;
function IsClick(){
    if( !is_drag ) return true;
    let tm = new Date().getTime() - time_push;
    if( Date.now-time_push  < tm )  return true;
    return false;
}
function Query(url,data,cb){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if( xhr.readyState !== 4 ) return;
        if( xhr.status === 200 ){
            cb(xhr.responseText);
            return;
        }
        cb(null);
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    xhr.send(data);
}
function GoHome(){ location.href = '/'; }
function c_back(){
    if(	this.readyState	!==	4	)	return;
    if(	this.status	!==	200	)	return;
    let result	=	this.responseText;
    //console.log('response - '+result);
    if(	result	===	'0'	){
        return;
    }
    alert("Error - "+result);
}
function MakeLink(name,url){ return '<li><span class="site_item" data-url="'+url+'"><a href="#" onclick="ModifyItem(this);">'+name+'</a></span> <a href="#" onclick="DeleteItem(this);">[-]</a></li>'; }
function MakePortlet(data){
    let ret = '<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"><div class="portlet-header ui-widget-header ui-corner-all"><a href="#" onclick="ModifyCategory(this);"><span class="site_category">'+data[0]+'</span></a> <a href="#" onclick="DeletePortlet(this);">[-]</a><a href="#" onclick="InsertItem(this);">[+]</a></div><div class="portlet-content"><ul id="bookmark" class="connectedSortable">';
    for(let i=1;i<data.length;++i) ret = ret + MakeLink(data[i][0],data[i][1]);
    return ret + '</ul></div></div>';
}
function ApplyEffects(){
    $( ".column" ).sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all",
        start: function(){ time_push = new Date().getTime(); is_drag=true; },
        stop: function(){ is_drag=false; }});
    $( "#bookmark, #bookmark2" ).sortable({
        connectWith: ".connectedSortable",
        revert: true,
        placeholder: "item-placeholder ui-corner-all",
        start: function(){ time_push = new Date().getTime(); is_drag=true },
        stop: function(){ is_drag=false; }});
    $( "ul, li" ).disableSelection();
}
function MakeContents(json_data){
    let contents = "";
    for(let i=0;i<json_data.length;++i){
        let column = '<div class="column">';
        for(let j=0;j<json_data[i].length;++j) column = column + MakePortlet(json_data[i][j]);
        contents = contents + column + '</div>';
    }
    $($(".total_frame")[0]).html(contents);
    ApplyEffects();
}
function InsertItem(obj){
    if(!IsClick()) return;
    let uls = $(obj).parent().parent().find("ul")[0];
    let data = $(uls).html()+MakeLink("No Name","");
    $(uls).html(data);
}
function DeletePortlet(obj){
    if(!IsClick()) return;
    $(obj).parent().parent().remove();
}
function DeleteItem(obj){
    if(!IsClick()) return;
    $(obj).parent().remove();
}
function InsertPortlet(){
    $( $("body").find(".column")[0] ).append(MakePortlet(new Array("New Category")));
    $( "#bookmark, #bookmark2" ).sortable({ connectWith: ".connectedSortable", revert: true });
    $( "ul, li" ).disableSelection();
}
function Save(){
    let columns = $("body").find(".column");
    let data = [];
    for(let i=0;i<columns.length;++i){
        let portlets = $(columns[i]).find(".portlet");
        data[i] = [];
        for(let j=0;j<portlets.length;++j){
            let str_category = $($(portlets[j]).find("span")[0]).html();
            data[i][j] = [];
            data[i][j][0] = str_category;
            let lis = $(portlets[j]).find('li');
            for(let c=0;c<lis.length;++c){
                let item = $(lis[c]).find('span');
                data[i][j][c+1] = [];
                data[i][j][c+1].push($($(item).find('a')[0]).html());
                data[i][j][c+1].push($(item).data("url"));
            }
        }
    }
    Query("api/save",JSON.stringify(data),c_back);
}
function ModifyCategory(obj_cat){
    if(!IsClick()) return;
    obj_modify_category = $(obj_cat).find("span")[0];
    let cat_name = $(obj_modify_category).html();
    $($(dialog_category).find('input')[0]).val(cat_name);
    dialog_category.dialog( "open" );
}
function ConfirmCategory(){
    let modify_str = $($(dialog_category).find('input')[0]).val();
    $(obj_modify_category).html(modify_str);
    dialog_category.dialog( "close" );
}
function ModifyItem(obj_item){
    if(!IsClick()) return;
    obj_modify_item = obj_item;
    let name = $(obj_modify_item).html();
    let obj_span = $(obj_modify_item).parent();
    let url = obj_span.data("url");
    $($(dialog_item).find('input')[0]).val(name);
    $($(dialog_item).find('input')[1]).val(url);
    dialog_item.dialog( "open" );
}
function ConfirmItem(){
    let modify_str = $($(dialog_item).find('input')[0]).val();
    let modify_url = $($(dialog_item).find('input')[1]).val();
    $(obj_modify_item).html(modify_str);
    let obj_span = $(obj_modify_item).parent();
    obj_span.data("url",modify_url);
    dialog_item.dialog( "close" );
}
window.onload = function(){
    MakeContents(JSON.parse(json_data));
    let btns = {};
    btns[category_btn_confirm] = ConfirmCategory;
    btns[category_btn_cancel] = function() { dialog_category.dialog( "close" ); };
    dialog_category = $( "#dialog_category" ).dialog({autoOpen: false,width: 350,height: 200,modal: true,
        buttons: btns,close: function() { dialog_category.dialog( "close" ); }});
    $("#dialog_category").keydown(function (event) {
        if (event.keyCode === $.ui.keyCode.ENTER) {
            ConfirmCategory();
            return false;
        }});
    btns = {};
    btns[site_btn_confirm] = ConfirmItem;
    btns[site_btn_cancel] = function() { dialog_item.dialog( "close" ); };
    dialog_item = $( '#dialog_item' ).dialog({autoOpen: false,width: 350,height: 250,modal: true,
        buttons: btns,close: function() { dialog_item.dialog( "close" ); }});
    $('#dialog_item').keydown(function (event) {
        if (event.keyCode === $.ui.keyCode.ENTER){
            ConfirmItem();
            return false;
        }});
}

