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
       // <%- cellValue.description %> 
       // type @<%- cellValue.type %> 
      <% } %>
      <%- cellKey %>;
    <% }) %>
    constructor(data) {
        <% _.mapKeys(value, function(cellValue, cellKey){ %>
          this.<%- $$.getMethodName(cellKey) %>(data.<%- cellKey %>);
        <% }) %>
    }
    
    <% _.mapKeys(value, function(cellValue, cellKey){ %>
          <%- $$.getMethodName(cellKey) %>() (value) {
            if(typeof value !== 'string') {
                console.log('error');
            }
            this.<%- cellKey %> = value;
         }
    <% }) %>
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