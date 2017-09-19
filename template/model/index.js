/* eslint-disable */
import instance from './instance';

class MyModel {
    myProp;

    constructor(data) {
        this._setMyProp(data.myProp);
    }

    _setMyProp(value) {
        if(typeof value !== 'string') {
            console.log('error');
        }
        this.myProp = value;
    }
}

export default(opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    }).then(data => {
        return new MyModel(data);
    });
}