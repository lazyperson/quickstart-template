// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function btnClick() {
    alert('你点击了click，这里是页面的UI层');
    document.getElementById("info").innerHTML = '你点击了click，这里是页面的UI层';
    document.body.style.backgroundColor = "#09c";
}
