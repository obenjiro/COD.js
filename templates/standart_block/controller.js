import Observer from './../helpers/observer.js'

export default class {{name}}Controller extends Observer {
    init() {

    }
    onFirstLoad() {
        this.fire('update');
    }
    onItemClick(id) {
        this.fire('item selected', id);
    }
}
