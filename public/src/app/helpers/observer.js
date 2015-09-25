export default class Observer {
    constructor() {
        this._subscribtionList = [];
    }
    subscribe(event, target, callbackName) {
        var callback = target[callbackName].bind(target);
        if (__DEV__) {
            console.info(
                '[#] ' + target.constructor.name + '.' + callbackName +
                ' <- subscribing to event <<' + event + '>>  of observer: ' + this.constructor.name
            );
        }
        this._subscribtionList.push({ event, callback, name: target.constructor.name, callbackName });
    }
    unsubscribe(event, callback) {
        if (__DEV__) {
            console.log(
                '[#] unsubscribe from event <<' + event + '>> of observer: ', this.constructor.name
            );
        }
        this._subscribtionList = this._subscribtionList.filter((subscribtion) => {
            return (subscribtion.event !== event && subscribtion.callback !== callback);
        });
    }
    fire(event, ...args) {
        if (__DEV__) {
            var isEvents = false;
            console.log(
                '[#] %c' + this.constructor.name, 'color: blue',
                ' firing event <<' + event + '>> with args: ', JSON.stringify(args)
            );
        }
        this._subscribtionList.forEach((subscribtion) => {
            if (subscribtion.event === event) {
                if (__DEV__) {
                    isEvents = true;
                    console.log(
                        '[#] ' + this.constructor.name + ' found event handler for <<' + event + '>> - calling %c' +
                        subscribtion.name + '.' + subscribtion.callbackName, 'color:green'
                    );
                }
                subscribtion.callback.apply(this, args);
            }
        });
        if (__DEV__) {
            if (!isEvents) {
                console.warn(
                    '[#] ' + this.constructor.name + ' not found any handlers for event <<' + event + '>> - nothing to call'
                );
            }
        }
    }
}
