<% _.forEach(data.mocks, function(mock, i){ %>
import <%- $$.convertUrl(mock.url) %> from './model/<%- $$.convertUrl(mock.url) %>';
<% }) %>

export default {
    <% _.forEach(data.mocks, function(mock, i){ %><%- $$.convertUrl(mock.url) %><% if(data.mocks.length - 1 !== i) { %>,
    <% } %><% }) %>
};