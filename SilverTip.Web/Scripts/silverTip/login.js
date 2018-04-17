

var Login = new Vue({
    el: '#loginform',
    data: {
        loginForm: {
            userName: '',
            password: ''

        }
    },
    methods: {
        login: function () {
            console.log(this.loginForm);
        }
    }
});