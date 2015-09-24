import Observer from './../helpers/observer.js'

export default class MainController extends Observer {
    init() {

    }
    onFirstLoad() {
        this.fire('update');
    }
    onItemClick(id) {
        this.fire('item selected', id);
    }
}
