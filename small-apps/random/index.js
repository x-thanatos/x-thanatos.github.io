(function (window) {
    var constant = {
        min: 0,
        max: 50,
        size: 20,
        interval: 50,
        timer: -1,
        flag: -1,
        results: []
    };
    var dom = {
        mask: document.getElementById('mask'),
        min: document.getElementById('min'),
        max: document.getElementById('max'),
        size: document.getElementById('size'),
        random: document.getElementById('random'),
        start: document.getElementById('start'),
        stop: document.getElementById('stop'),
        results: document.getElementById('results'),
        result: document.getElementById('result')
    };

    function closeMask() {
        dom.mask.style.display = 'none';
        dom.result.innerText = '';
    }

    function openMask(value) {
        dom.mask.style.display = 'block';
        dom.result.innerText = value;
    }

    function setMinMax() {
        constant.min = parseInt(dom.min.value) || 0;
        constant.max = parseInt(dom.max.value) || 50;
        constant.size = parseInt(dom.size.value) || 20;
    }

    function getNumber(start, end) {
        var random = Math.random() * constant.max;
        var out = random.toFixed(0);
        if (constant.results.length === constant.size) {
            return constant.flag
        }
        if ((start < random < end) && constant.results.indexOf(out) === -1) {
            return out
        }
        return getNumber(start, end)
    }

    function setButton(isStart) {
        dom.start.style.display = isStart ? 'none' : '';
        dom.stop.style.display = isStart ? '' : 'none';
    }

    function start() {
        if (constant.results.length >= constant.size) {
            alert('计数数量已达上限：' + constant.size);
            return false;
        }
        setButton(true);
        setMinMax();
        constant.timer = setInterval(function () {
            dom.random.innerText = getNumber(constant.min, constant.max)
        }, constant.interval)
    }

    function stop() {
        setButton(false);
        clearInterval(constant.timer);
        var value = dom.random.innerText;
        if (constant.results.length < constant.size) {
            constant.results.push(value);
            if (parseInt(value) !== constant.flag) {
                dom.results.innerHTML += '<li>' + value + '</li>'
                openMask(value);
            }
        } else {
            alert('计数数量已达上限：' + constant.size)
        }
    }


    dom.mask.addEventListener('click', function () {
        closeMask();
    })
    setButton(false);
    // IE
    window.start = start;
    window.stop = stop;
}(window));
