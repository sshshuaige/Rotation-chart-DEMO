function move(obj, target, callback) {
    //每次添加计时器时去除之前的计时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        
        var step;
        //每次步数有小数时向上取整 否则会达不到目标位置
        if (obj.offsetLeft < target) {
            step = Math.ceil((target - obj.offsetLeft) / 10);
        } else {
            step = Math.floor((target - obj.offsetLeft) / 10);
        }
        //如果到了目标位置则清楚计时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if(callback) {
                callback();
            }
    } obj.style.left = obj.offsetLeft + step + 'px';
    },15)
    
}  