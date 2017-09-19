<% if(data.error){ %>
export default(opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    });
}
<% }else} %>
import instance from './instance';
<% for(var item in data){ %>
  <%- item %>
<% } %>
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
    <%- JSON.stringify(data) %>
export default(opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    }).then(data => {
        return new MyModel(data);
    });
}
<% } %>