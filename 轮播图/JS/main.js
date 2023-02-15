var box = document.querySelector('.box');
var right = document.querySelector('.right');
var left = document.querySelector('.left');
box.addEventListener('mouseenter', function() {
    right.style.display = 'block';
    left.style.display = 'block';
    //鼠标经过清除定时器
    clearInterval(timer);
    timer = null;
    })
box.addEventListener('mouseleave', function() {
    right.style.display = 'none';
    left.style.display = 'none';
    //鼠标离开开启定时器
    timer = setInterval(function(){
        right.click();
    }, 2000)
    })
var cont = document.querySelector('.cont');
var yuanUl = document.querySelector('.yuan').querySelector('ul');
var imgs = cont.querySelectorAll('img');
console.log(yuanUl);
console.log(imgs);
//动态创建小圆点
for (var i = 0; i < imgs.length; i++) {
    var li = document.createElement('li');
    // 记录当前小圆圈的索引号
    li.setAttribute('index', i);
    yuanUl.appendChild(li);
    li.addEventListener('click', function() {
        for(var i = 0; i < yuanUl.children.length; i++) {
            yuanUl.children[i].className = '';
            
        }
        this.className = 'current';
        //获得当前圆圈的index 将其赋值给num和circle 就能让二者同步变化
        var index = this.getAttribute('index');
        num = circle = index;
        var index = this.getAttribute('index');
        console.log(index);
        move(cont, -index*846)
    })
}
//深拷贝第一个图片到最后
var clone1 = imgs[1].cloneNode(true);
cont.appendChild(clone1);
var num = 0;
//实现小圆点和右侧键一起运动
var circle = 0;
//节流阀
var flag = true;
right.addEventListener('click', function() {
    if(flag) {
        //如果图片到了最后则立即跳到第一个 并重新给num赋值
        flag=false;//关闭节流阀
        if(num == imgs.length){
            cont.style.left = 0;
            num = 0;
        }
        num++;
        move(cont, -num * 846, function() {
            //move动画完成之后再打开节流阀
            flag = true;
        }
        );
        circle++;
        if(circle == 4) {
            circle = 0;
        }
        circleChange();
        }
})
left.addEventListener('click', function() {
    if(flag){
        //如果图片到了最后则立即跳到第一个 并重新给num赋值
        if(num == 0){
            cont.style.left = -(imgs.length-1) * 846 + 'px';
            num = imgs.length-1;
        }
        num--;
        move(cont, -num * 846, function(){
            //move动画完成之后再打开节流阀
            flag = true;
        });
        circle--;
        if(circle < 0) {
            circle = yuanUl.children.length - 1;
        }
        circleChange();
        }
})
//重复代码可以定义函数调用
function circleChange() {
    for(var i = 0; i < yuanUl.children.length; i++) {
        yuanUl.children[i].className = '';
    }
    yuanUl.children[circle].className = 'current';
}

//定时器 自动播放图片
var timer = setInterval(function(){
    //手动调用事件
    right.click();
}, 2000)