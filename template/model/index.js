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
<% _.mapKeys(data.response_model, function(value, key){ %>
  <% if(key !== 'data'){ %>
class <%- key %> {
    <% _.mapKeys(value, function(cellValue, cellKey){ %>
      <% if(cellValue.description){ %>
        // cellValue.description
      <% } %>
      <%- cellKey %>;
    <% }) %>
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
<% }) %>
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