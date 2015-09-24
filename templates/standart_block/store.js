import Observer from './../helpers/observer.js'

export default class {{name}}Store extends Observer {
    init() {

    }
    onUpdate() {
        this.fire('update', [1, 2, 3]);
    }
}
