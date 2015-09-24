import Observer from './observer.js'

export default class NoopView extends Observer {
    init() {
        // doing nothing
    }
    onUpdate() {
        // doing nothing
    }
}
