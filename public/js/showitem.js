let winOnLoad = function () {
    let app = new Vue({
        el: '#app',
        methods: {
            goBack: function () {
                history.back();
            }
        }
    })
}

window.onload = winOnLoad;