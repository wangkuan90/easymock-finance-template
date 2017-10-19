import instance from '../instance';<% if(data.response_model.error){ %>
export default (opts) => {
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    });
}<% }else{ %>
import DataCheck from 'datacheck';

const dataCheckUrl = '<%- data.url %>';
<% if(data.parameters.length > 0){ %>
class ParamsDTo extends DataCheck.Response{
<% _.mapKeys(data.parameters, function(value, key){ %>
    // <%- $$.filterDescription(value.description) %>
    <% if(value.type === 'string'){ %>@DataCheck.isString<%- value.required ? '(true)' : '()' %><% }else if(value.type === 'boolean'){ %>@DataCheck.isBoolean<%- value.required ? '(true)' : '()' %><% }else if(value.type === 'integer'){ %>@DataCheck.isInteger<%- value.required ? '(true)' : '()' %><% } %>
    <%- value.name %>;
<% }) %>
    constructor(data = {}) {
        super(dataCheckUrl);<% _.mapKeys(data.parameters, function(value, key){ %>
        this.<%- $$.getMethodName(value.name) %>(data.<%- value.name %>);<% }) %>
    }<% _.mapKeys(data.parameters, function(value, key){ %>
    <%- $$.getMethodName(value.name) %>(value) {
        this.<%- value.name %> = value;
    }<% }) %>
}
<% } %><% _.mapKeys(data.response_model, function(value, key){ %><% if(value.type === 'array'){ %>
class <%- $$.filterMethodName(value.modelType) %>Array {
    constructor(data) {
        return data.map(value => new <%- $$.filterMethodName(value.modelType) %>(value));
    }
}<% } %><% if(key !== 'data'){ %>
class <%- $$.filterMethodName(key) %> extends DataCheck.Response{<% _.mapKeys(value, function(cellValue, cellKey){ %><% if(cellKey !== '_id_'){ %>
    <% if(cellValue.description){ %>// <%- $$.filterDescription(cellValue.description) %><% } %>
    <% if(cellValue.type !== 'array' && cellValue.type){ %><% if(cellValue.type === 'string'){ %>@DataCheck.isString<%- cellValue.required ? '(true)' : '()' %><% }else if(cellValue.type === 'boolean'){ %>@DataCheck.isBoolean<%- cellValue.required ? '(true)' : '()' %><% }else if(cellValue.type === 'integer'){ %>@DataCheck.isInteger<%- cellValue.required ? '(true)' : '()' %><% } %><% } %> 
    <%- cellKey %>;<% } %>
    <% }) %>
    
    constructor(data) {
        super(dataCheckUrl);<% _.mapKeys(value, function(cellValue, cellKey){ %><% if(cellKey !== '_id_'){ %>
        this.<%- $$.getMethodName(cellKey) %>(data.<%- cellKey %>);<% } %><% }) %>
    }<% _.mapKeys(value, function(cellValue, cellKey){ %><% if(cellKey !== '_id_'){ %>
    <%- $$.getMethodName(cellKey) %>(value) {
        <% if(cellValue.type === 'array'){ %>this.<%- cellKey %> = value.map(item => new <%- $$.getMethodName2(cellValue.items.$ref) %>(item));<% }else if(cellValue.type){ %>this.<%- cellKey %> = value;<% }else{ %>this.<%- cellKey %> = new <%- $$.getMethodName2(cellValue.$ref) %>(value);<% } %>
    }<% } %><% }) %>
}<% } %><% }) %>

export default (opts) => {<% if(data.parameters.length > 0){ %>
    opts = new ParamsDTo(opts);<% } %>
    return instance({
        method: '<%- data.method %>',
        url: '<%- data.url %>',
        opts: opts
    }).then(data => {
        <% _.mapKeys(data.response_model, function(value, key){ %><% if(key === 'data'){ %><% if(value.type === 'array'){ %>return new <%- $$.filterMethodName(value.modelType) %>Array(data);<% }else if($$.isNormalType(value.type)){ %>return data;<% }else{ %>return new <%- $$.filterMethodName(value.modelType) %>(data);<% } %><% } %><% }) %>
    });
};<% } %>