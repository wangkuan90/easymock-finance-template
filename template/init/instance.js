import { createAPI } from '<%- $$.relative("util") %>';
import config from '<%- $$.relative("config") %>';

const baseUrl = {
	mock: 'https://www.easy-mock.com/mock/<%- data.project._id %><%- data.project.url %>',
	development: '',
	prepub: '',
	production: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);