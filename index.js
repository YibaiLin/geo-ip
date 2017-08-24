var ipMsg = document.getElementById("ipInput"); //获取input元素
var container = document.getElementById("container");//获取放置地图的div
var wrap = document.getElementById("wrap");//获取放置输入框和地理信息显示表的div
var lat,long; //用于保存IP查询信息的维度和经度

ipMsg.addEventListener("keydown", myKeyboardFn);//给输入框添加键盘事件

container.style.visibility = "hidden";//地图显示框默认隐藏


//按下“enter”键时提交信息查询请求
function myKeyboardFn(event) {
    var x = event.which || event.keyCode;
    if(x === 13) {
        return receiveGeoInfo();
    }
}

//在body最下边添加一个script标签，以获取要查询IP的信息
function receiveGeoInfo() {
    var addressMsg = ipMsg.value;
    var s = document.createElement("script");
    s.src = "http://freegeoip.net/json/" + addressMsg + "?callback=displayFn"; //freegeoip.net 的API
    document.body.appendChild(s);
}

//freegeoip.net 的API需要的callback函数，负责显示返回的信息
function displayFn(obj) {
    var txt = "<table><caption>Geography Information</caption>";
    txt += "<tr><td>IP Address</td>" + "<td>" +  obj.ip + "</td>" +
        "<tr><td>Country</td>" + "<td>" +  obj.country_name + "</td>" +
        "<tr><td>Region</td>" + "<td>" +  obj.region_name + "</td>" +
        "<tr><td>City</td>" + "<td>" +  obj.city + "</td>" +
        "<tr><td>Lat/Long</td>" + "<td><a id='latLong' href='#container'>" + obj.latitude + ", " + obj.longitude + "</a></td>";

    lat = obj.latitude;
    long = obj.longitude;

    //地理信息返回后，对两个包含div高度的调整
    wrap.style.top = "5%";
    container.style.top = "5%";

    //当承载地图的元素已经是可见状态时，查询输入框更新后直接更新地图
    if(container.style.visibility === "visible") {
        createMap();
    }

    document.getElementById("info").innerHTML = txt; //在#info中显示信息

    document.getElementById("latLong").addEventListener("click", shiftLayout); //给“经纬度”添加点击事件
}

//点击“经纬度”时，将wrap框左移，并调出地图
function shiftLayout() {
    //定义左移动画效果
    if(wrap.style.left !== "2%") {
        var pos = 50;
        var id = setInterval(frame, 2);
        function frame() {
            if(pos === 2) {
                clearInterval(id);
                return createMap();
            }else {
                pos--;
                wrap.style.left = pos + "%";
                wrap.style.transform = "translate(-" + (pos-2) + "%, 0)";
            }
        }
    }
    //若地图已经显示，则点击事件只更新地图
    else {
        return createMap();
    }
}

//在body最下边添加一个script标签，以调用百度地图API
function createMap() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=d7aMHTxdy5uOGoK1ADMUYYwt66F081dd&callback=initialize";
    document.body.appendChild(script);

    container.style.visibility = "visible";
}

//百度地图API需要的callback函数，负责显示返回的信息
function initialize() {
    var x = long;
    var y = lat;

    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(x, y);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
}