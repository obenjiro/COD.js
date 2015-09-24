import JsonView from './../helpers/jsonview.js'

export default class {{name}}JsonView extends JsonView {
    init() {
        this.viewName = '{{toLowerCase name}}'
    }
}
