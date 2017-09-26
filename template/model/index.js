import instance from './instance';
<% if(data.response_model.error){ %>
export default(opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    });
}
<% }else{ %>
<% _.mapKeys(data.response_model, function(value, key){ %>
<% if(value.type === 'array'){ %>
class <%- value.modelType %>Array {
    constructor(data) {
        return data.map(value => new <%- value.modelType %>(value));
    }
}
<% } %>
  <% if(key !== 'data'){ %>
class <%- $$.filterMethodName(key) %> {
    <% _.mapKeys(value, function(cellValue, cellKey){ %>
      <% if(cellKey !== '_id_'){ %>
          <% if(cellValue.description){ %>
           // <%- cellValue.description %> 
           // type @<%- cellValue.type %> 
          <% } %>
          <%- cellKey %>;
       <% } %>
    <% }) %>
    constructor(data) {
        <% _.mapKeys(value, function(cellValue, cellKey){ %>
          <% if(cellKey !== '_id_'){ %>
            this.<%- $$.getMethodName(cellKey) %>(data.<%- cellKey %>);
          <% } %>
        <% }) %>
    }
    
    <% _.mapKeys(value, function(cellValue, cellKey){ %>
          <% if(cellKey !== '_id_'){ %>
              <%- $$.getMethodName(cellKey) %>(value) {
                  <% if(cellValue.type === 'array'){ %>
                      if(typeof value !== 'object') {
                          console.log('error');
                      }
                      return value.map(item => new <%- $$.getMethodName2(cellValue.items.$ref) %>(item));
                  <% }else{ %>
                      // TODO
                      this.<%- cellKey %> = value;
                  <% } %>
             }
          <% } %>
    <% }) %>
}
  <% } %>
<% }) %>
export default (opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    }).then(data => {
        <% _.mapKeys(data.response_model, function(value, key){ %>
            <% if(key === 'data'){ %>
                <% if(value.type === 'array'){ %>
                    return new <%- value.modelType %>Array(data);
                <% }else if($$.isNormalType(value.type)){ %>
                    return data;
                <% }else{ %>
                    return new <%- $$.filterMethodName(value.modelType) %>(data);
                <% } %>
            <% } %>
        <% }) %>
    });
}
<% } %>