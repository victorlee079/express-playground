let winOnLoad = function () {
    let app = new Vue({
        el: '#app',
        data: {
            hr: null,
            min: null,
            sec: null
        },
        methods: {
            letFillNum: function (num, targetLength) {
                return num.toString().padStart(targetLength, 0);
            },
            updateClock: function () {
                let dt = new Date();
                console.log("TEST");
                this.hr = this.letFillNum(dt.getHours(), 2);
                this.min = this.letFillNum(dt.getMinutes(), 2);
                this.sec = this.letFillNum(dt.getSeconds(), 2);
            }
        },
        created: function () {
            this.updateClock();
            setInterval(this.updateClock, 1000);
        }
    })
}

window.onload = winOnLoad;