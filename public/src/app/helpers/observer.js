export default class Observer {
    constructor() {
        this._subscribtionList = [];
    }
    subscribe(event, target, callbackName) {
        var callback = target[callbackName].bind(target);
        if (__DEV__) {
            console.log('subscribeing to event "', event, '" of observer: ', this.constructor.name);
        }
        this._subscribtionList.push({ event, callback });
    }
    unsubscribe(event, callback) {
        if (__DEV__) {
            console.log('unsubscribeing of event "', event, '" of observer: ', this.constructor.name);
        }
        this._subscribtionList = this._subscribtionList.filter((subscribtion) => {
            return (subscribtion.event !== event && subscribtion.callback !== callback);
        });
    }
    fire(event, ...args) {
        if (__DEV__) {
            console.log('firing event "', event, '" with args: ', JSON.stringify(args));
        }
        this._subscribtionList.forEach((subscribtion) => {
            if (subscribtion.event === event) {
                if (__DEV__) {
                    console.log('found event "', event, '" handler - calling callback');
                }
                subscribtion.callback.apply(this, args);
            }
        });
    }
}
