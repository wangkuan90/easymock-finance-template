import instance from '../instance';
<% if(data.response_model.error){ %>
export default (opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    });
}
<% }else{ %>
import DataCheck from 'datacheck';
const dataCheckUrl = '<%- data.url %>';
<% _.mapKeys(data.response_model, function(value, key){ %>
<% if(value.type === 'array'){ %>
class <%- $$.filterMethodName(value.modelType) %>Array {
    constructor(data) {
        return data.map(value => new <%- $$.filterMethodName(value.modelType) %>(value));
    }
}
<% } %>
  <% if(key !== 'data'){ %>
class <%- $$.filterMethodName(key) %> extends DataCheck.Response{
    <% _.mapKeys(value, function(cellValue, cellKey){ %>
      <% if(cellKey !== '_id_'){ %>
          <% if(cellValue.description){ %>
           // <%- $$.filterDescription(cellValue.description) %> 
          <% } %>
          <%- cellKey %>;
       <% } %>
    <% }) %>
    constructor(data) {
        super(dataCheckUrl);
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
                      this.isArray('<%- cellKey %>', value);
                      this.<%- cellKey %> = value.map(item => new <%- $$.getMethodName2(cellValue.items.$ref) %>(item));
                  <% }else if(cellValue.type){ %>
                      <% if(cellValue.type === 'string'){ %>
                      this.isString('<%- cellKey %>', value);
                      <% }else if(cellValue.type === 'boolean'){ %>
                      this.isBoolean('<%- cellKey %>', value);
                      <% }else if(cellValue.type === 'integer'){ %>
                      this.isInteger('<%- cellKey %>', value);
                      <% } %>
                      this.<%- cellKey %> = value;
                  <% }else{ %>
                      this.<%- cellKey %> = new <%- $$.getMethodName2(cellValue.$ref) %>(value);
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
                    return new <%- $$.filterMethodName(value.modelType) %>Array(data);
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