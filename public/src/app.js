import './app.css'

import Main from './app/main/index.js'

class App {
    init() {
        this.main = new Main();

        this.main.init();

        this.main.controller.fire('first load');
    }
}

!function() {

    var app = new App();
    if (__DEV__) {
        // we need to have app as global variable for debug
        window.app = app;
    }
    document.addEventListener('DOMContentLoaded', app.init.bind(app), false);

}();
