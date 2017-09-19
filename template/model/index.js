<% if(data.error){ %>
export default(opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    });
}
<% }else{ %>
import instance from './instance';
<% for(var item in data.response_model){ %>
  <% if(item !== 'data'){ %>
class <%- item %> {
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
  <% } %>
<% } %>
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