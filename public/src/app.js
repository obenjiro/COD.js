import './app.css'

import Main from './app/main/index.js'

class App {
    init() {
        if (!__DEV__) {
            // deferred style loading
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', 'bundle.css');
            document.getElementsByTagName('head')[0].appendChild(link);
        }

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
