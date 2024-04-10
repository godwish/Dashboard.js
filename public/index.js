const gradient = [
    "#86c6e2,#429cc5",
    "#ef92a7,#eb787c",
    "#f0b341,#eb9b1d",
    "#73d1d7,#4bb8be",
    "#b290e0,#916cc8"
];
var cnt_color = 0;
function MakeLink(name,url){ return '<li><a href="'+url+'" target="_blank">'+name+'</a></li>'; }
function MakePortlet(data){
    let ret = '<div class="portlet"><div class="portlet-header" style="background-image: linear-gradient('+gradient[cnt_color++%5]+')" >'+data[0]+'</div><div class="portlet-content"><ul id="bookmark" class="connectedSortable">';
    for(let i=1;i<data.length;++i) ret += MakeLink(data[i][0],data[i][1]);
    return ret + '</ul></div></div>';
}
function ApplyEffects(){
    $( ".column" ).addClass( "ui-corner-all" );
    $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" ).find( ".portlet-header" ).addClass( "ui-widget-header ui-corner-all" );
    $( "ul, li" ).disableSelection();
}
function MakeContents(json_data){
    let contents = '';
    for(let i=0;i<json_data.length;++i){
        let column = '<div class="column">';
        for(let j=0;j<json_data[i].length;++j) column = column + MakePortlet(json_data[i][j]);
        contents = contents + column + '</div>';
    }
    $($(".total_frame")[0]).html(contents);
    ApplyEffects();
}
window.onload = function(){ MakeContents(JSON.parse(json_data)); }
