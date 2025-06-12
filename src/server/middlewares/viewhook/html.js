import { http } from "../../../common/helper"

async function html(entryPoint) {
  let sourceAddress = await handelResource(entryPoint);

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <script>
      //根据屏幕大小改变根元素字体大小
      (function(doc, win) {
      window.__fontUnit = 0
      var docEl = doc.documentElement,
      recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth >= 750) { //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
              window.__fontUnit = 100;
              docEl.style.fontSize = window.__fontUnit + 'px';

          } else {
              window.__fontUnit = 200 * (clientWidth / 750);
              docEl.style.fontSize = window.__fontUnit + 'px'; //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
          }
      };

      if (!doc.addEventListener) return;
      doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
  </script>
  </head>
  <body>
    <div id="app"></div>
    ${sourceAddress.script}
    <script>
        window.__zx__ = "zx"
    </script>
  </body>
</html>`
}

async function handelResource(entryPoint) {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === "production" ? true : false;
  const resourceUrl = process.env.HTTP_RESOURCE_URL;
  const remoteAddress = process.env.HTTP_RESOURCE_URL + "/";

  let scriptJson = await http.get(isProduction ? "" : resourceUrl + "/script-manifest.json") || {};
  const sourceAddress = { script: '', link: '' }
  const needHandleFile = ['runtime~single', 'chunk-vendors', 'chunk-commons', entryPoint, 'extend']
  const getResource = (file) => {
    const fileValue = JSON.parse(JSON.stringify(scriptJson[file] || {}));
    if (fileValue.script)
      sourceAddress.script += fileValue.script.map(ele => `<script src="${remoteAddress}${ele}"></script>`).join('');
    if (fileValue.link)
      sourceAddress.link += fileValue.link.map(ele => `<link href="${remoteAddress}${ele}" rel="stylesheet" type="text/css" />`).join('');
  }
  needHandleFile.forEach(file => getResource(file))

  return sourceAddress;
}

export default html;