import SimplePromise from './simplepromise.js'

/**
 * Simplest fetch polyfill that returns {@link SimplePromise} witch resolves into {@link FetchResponse}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 * @param {String} url - target url
 * @param {{method: String, async: boolean, timeout: Number}} [options] - options that will configure request
 * @return {SimplePromise} returns a SimplePromise
 *
 * @example
 * fetch('/data').then((response) => {
 *     this.viewmodel.update(response.data);
 * }).fail((error) => {
 *     this.viewmodel.show_notification(error);
 * })
 */
export default function fetch(url, {method = 'GET', async = true, timeout = 10000} = {}) {
    var promise = new SimplePromise();

    // since we don't need to support legacy browsers we will use
    // standard XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.timeout = timeout;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
            if ([200, 201].indexOf(xhr.status) > -1) {
                promise.resolve(new FetchResponse({
                    status: xhr.status,
                    data: _processResponse(xhr)
                }));
            } else {
                promise.reject(new FetchResponse({
                    status: xhr.status,
                    error: _processResponse(xhr)
                }));
            }
        }
    };
    xhr.ontimeout = () => {
        promise.reject(new FetchResponse({
            status: xhr.status,
            error: 'Request Timeout'
        }));
    };
    xhr.send();

    return promise;
}

/**
 * Fetch response object
 * @interface
 */
export class FetchResponse {
    constructor({status, data, error}) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}

/**
 * Process responseText and returned parsed or raw content depending on options.responseType
 *
 * @private
 * @param {XMLHttpRequest} xhr - native xhr object
 * @return {*} returns response data
 */
function _processResponse(xhr) {
    var contentType = xhr.getResponseHeader('Content-Type') || '';
    var match = contentType.match(/\w+\/(\w+)/) || [];
    var type = match[1];
    if (type === 'json') {
        return JSON.parse(xhr.responseText);
    }
    return xhr.responseText;
}
