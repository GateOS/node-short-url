Install:

Method1：

```
npm install node-short-url -g
shorturl-server -p 3002
```

Method2：
```
git clone https://github.com/nilornot/node-short-url.git
cd node-short-url
npm install 
node index.js -p 3002
```
   
Example：

```
  var url = 'http://www.baidu.com'; //need short url
      console.log(url);
      var shorturl_server = 'http://localhost:3000'； //my short url server
      $.get(shorturl_server + '?url=' + url, function (res) {
        var shorturl = shorturl_server + '/' + res.shortid;

        console.log(shorturl);
        var canvas = qrcanvas({
          "cellSize": 6,
          "foreground": [
            { "style": "#000000" },
            { "row": 0, "rows": 7, "col": 0, "cols": 7, "style": "#000000" },
            { "row": -7, "rows": 7, "col": 0, "cols": 7, "style": "#000000" },
            { "row": 0, "rows": 7, "col": -7, "cols": 7, "style": "#000000" },
            { "row": 2, "rows": 3, "col": 2, "cols": 3, "style": "#000000" },
            { "row": -5, "rows": 3, "col": 2, "cols": 3, "style": "#000000" },
            { "row": 2, "rows": 3, "col": -5, "cols": 3, "style": "#000000" }
          ],
          "background": "#ffffff",
          "data": shorturl,
          "typeNumber": 1,
          // "logo":{
          //    "clearEdges":0,
          //    "size":0.13,
          //    "margin":0,
          //    "image":document.getElementById('qrcode-logo')
          // }
        });
        canvas.style.width = "177px";
        canvas.style.height = "177px";
        document.getElementById('qrcode').appendChild(canvas);
      })
    })
```