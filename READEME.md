# IP 地理信息查询

这个程序使用 [freegeoip.net](http://freegeoip.net) 提供的API，来返回给定 IP 的地理信息，包括：国家、地区、城市以及经纬度等等。此外，该程序还调用了[百度地图API](http://lbsyun.baidu.com/)。

这个程序并无新意，只是学习 JSONP 时所用，练习如何跨域调用API，然后自定义了 UI 、增添了些动画效果，[点此尝试](https://yibailin.github.io/geo-ip/)，效果如下：

### 搜索框：

![input-box](img/input-box.png)		

#### 地理信息查询结果：

![geo-info](img/geo-info.png)	

#### 该地区经纬度的地图显示：

![geo-map](img/geo-map.png)