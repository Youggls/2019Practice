import Vue from 'vue';

let app = new Vue({
    el: "#app",
    data: {
        message: "Hello world" + new Date().toLocaleDateString()
    }
});