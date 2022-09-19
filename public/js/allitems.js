let winOnLoad = function () {
    let app = new Vue({
        el: '#app',
        data: {
            items: [],
            fItems: []
        },
        created: function() {
            $.ajax({
                method: "POST",
                url: "/items",
            }).done(function (data) {
                app.items = data.result;
                app.fItems = app.items;
            });
        },
        methods: {
            viewItem: function (item) {
                location.href = "/item?id=" + item.id;
            },
            search: function(event) {
                let searchKey = event.target.value;
                this.fItems = this.items.filter(item => item.title.includes(searchKey));
            }
        }
    })
}

window.onload = winOnLoad;