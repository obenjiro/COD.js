import Observer from './../helpers/observer.js'

export default class {{name}}ViewModel extends Observer {
    init() {
        this.selectedItemId = null;
        this.data = null;
    }
    onUpdate(data) {
        this.fire('update', data.map((item) => {
            return { id: item, selected: item === this.selectedItemId }
        }));
        this.data = data;
    }
    onItemSelected(id) {
        this.selectedItemId = id;
        this.onUpdate(this.data);
    }
}
