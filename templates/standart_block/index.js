import './view.css'

import {{name}}Controller from './controller.js'
import {{name}}Store from './store.js'
import {{name}}ViewModel from './viewmodel.js'
import {{name}}JsonView from './view-json.js'
//import {{name}}D3View from './view-d3.js'

export default class {{name}} {
    init() {
        this.controller = new {{name}}Controller();
        this.store = new {{name}}Store();
        this.viewmodel = new {{name}}ViewModel();
        this.view = new {{name}}JsonView();
        //this.view = new {{name}}D3View();

        this.view.init();
        this.viewmodel.init();
        this.store.init();
        this.controller.init();


        this.controller.subscribe('first load',
            this.controller, 'onFirstLoad');
        this.controller.subscribe('update',
            this.store, 'onUpdate');
        this.controller.subscribe('item selected',
            this.viewmodel, 'onItemSelected');


        this.store.subscribe('update',
            this.viewmodel, 'onUpdate');

        this.viewmodel.subscribe('update',
            this.view, 'onUpdate');

        this.view.subscribe('item click',
            this.controller, 'onItemClick');

    }
}
