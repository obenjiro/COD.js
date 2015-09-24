import Observer from './observer.js'

export default class JsonView extends Observer {
    init() {
        this.viewName = 'jsonview' + (new Date()).getTime();
    }
    onUpdate(data) {
        if (!this.viewName) {
            throw 'viewName field is required';
        }

        var element = document.querySelector('.' + this.viewName);
        if (!element) {
            element = document.createElement('div');
            element.className = this.viewName;
            document.body.appendChild(element);
        }
        element.innerHTML = '<pre><h3>' + this.viewName + '</h3><br>' + JSON.stringify(data, null, 4);
    }
}
