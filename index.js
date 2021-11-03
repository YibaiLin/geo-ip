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
        var ip = ipMsg.value || '';
        // console.log(ip)
        const url = 'http://localhost:3001/?ip=' + ip
        
        fetch(url, {
                mode: 'cors',
            })
            .then(res => {
                const data =  res.json()
                return data
            })
            .then(res => {
                // console.log(res)
                if (res.success) {
                    const data = res.data
                    displayFn(data)
                }
                else {
                    displayFailed(res.msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// 显示获取地理信息失败
function displayFailed(msg) {
    var txt = "<table><caption style='text-align:center'>查询失败，请重试</caption></table>";
    document.getElementById("info").innerHTML = txt; //在#info中显示信息
}


//freegeoip.net 的API需要的callback函数，负责显示返回的信息
function displayFn(obj) {
    var txt = "<table><caption>Geography Information</caption>";
    txt += "<tr><td>省份</td>" + "<td>" +  obj.province + "</td>" +
        "<tr><td>城市</td>" + "<td>" +  obj.city + "</td>" +
        "<tr><td>行政区划代码</td>" + "<td>" +  obj.adcode + "</td>" +
        "<tr><td>城市代码</td>" + "<td>" +  obj.city_code + "</td>" +
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
    script.src = "https://api.map.baidu.com/api?v=3.0&ak=0SwSKSZ0DceLgnGXDi9782kbV1mX10ER&callback=initialize";
    document.body.appendChild(script);

    container.style.visibility = "visible";
}

//百度地图API需要的callback函数，负责显示返回的信息
function initialize() {
    var x = long;
    var y = lat;
    console.log(x,y)

    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(x, y);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
}