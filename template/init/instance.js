import Util from '<%- $$.relative("util") %>';
import config from '<%- $$.relative("config") %>';

const baseUrl = {
	mock: 'https://mock.souche-inc.com/mock<%- data.project._id %><%- data.project.url %>',
	development: '',
	prepub: '',
	production: ''
}[config.env || 'mock'];

export default Util.<%- projectName %>(baseUrl);