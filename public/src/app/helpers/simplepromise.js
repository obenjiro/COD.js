export default class SimplePromise {
    constructor() {
        this.isResolved = false;
        this.data = null;
        this.successCallbacks = [];
        this.rejectCallbacks = [];
    }
    resolve(data) {
        if (!this.isResolved) {
            this.processCallbacks(this.successCallbacks, data);
        }
    }
    reject(data) {
        if (!this.isResolved) {
            this.processCallbacks(this.rejectCallbacks, data);
        }
    }
    processCallbacks(callbacks, data) {
        this.isResolved = true;
        this.data = data;
        callbacks.forEach((callback) => callback(data));
    }
    then(callback) {
        if (this.isResolved) {
            callback(this.data);
        } else {
            this.successCallbacks.push(callback);
        }
        return this;
    }
    fail(callback) {
        if (this.isResolved) {
            callback(this.data);
        } else {
            this.rejectCallbacks.push(callback);
        }
        return this;
    }
}
