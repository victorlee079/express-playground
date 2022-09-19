let app = null;
let winOnLoad = function () {
    app = new Vue({
        el: '#app',
        data: {
            titleError: false,
            priceError: false,
            imgError: false,
            title: "",
            price: 0,
            imageUrl: "",
            showAlert: false,
            addSuccess: false
        },
        methods: {
            _isPositiveInteger: function (value) {
                return /^\d+$/.test(value);
            },
            submit: function () {
                this.showAlert = false;
                this.addSuccess = false;

                this.titleError = !this.title;
                this.priceError = this.price === "" || !this._isPositiveInteger(this.price) || this.price > 1000000 || this.price < 0;
                this.imgError = !this.imageUrl;

                if (this.titleError || this.priceError || this.imgError) {
                    return;
                } else {
                    $.post("/add_item", {
                        "title": this.title,
                        "price": this.price,
                        "imageUrl": this.imageUrl
                    }).done(function (data) {
                        app.addSuccess = data.success;
                        app.showAlert = true;
                    });
                }
            }
        },
        computed: {
            showSuccess: function () {
                return this.showAlert && this.addSuccess;
            },
            showFail: function () {
                return this.showAlert && !this.addSuccess;
            }
        }
    });
}

window.onload = winOnLoad;