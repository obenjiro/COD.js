import Observer from './../helpers/observer.js'

export default class MainStore extends Observer {
    init() {

    }
    onUpdate() {
        this.fire('update', [1, 2, 3]);
    }
}
