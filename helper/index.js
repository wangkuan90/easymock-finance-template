const normalTypeArr = ['string', 'object', 'boolean'];
/**
 * @desc 过滤方法名称
 */
const filterMethodName = function(name = '') {
    return name.replace(/[^a-zA-Z]/g, '');
}

exports.convertUrl = function(url) {
    // /restful/:id/:list/{id} -> restful_id_list_id
    // /restful/:id/:list/{id}.json -> restful_id_list_id
    const _url = url
        .replace(/:|{|}/g, '')
        .split('/')
        .filter(value => !!value).join('_');
    return _url.split('.')[0];
};

exports.getMethodName = function(name = '') {
    // name -> _setName
    if(typeof name === 'string' && name.length > 0) {
        name = 'set' + name.replace(/^\S/, function(s) {
            return s.toUpperCase();
        });
        return '_' + filterMethodName(name);
    }
    return name;
};

exports.filterMethodName = filterMethodName;

exports.filterDescription = function(description){
    return description.replace(/[\n]/ig, '');
};

exports.getMethodName2 = function(name = '') {
    var arr =  name.split('/');
    return filterMethodName(arr[arr.length - 1]);
}

/**
 * @param {Object} type  object, string, boolean is Normal Type
 */
exports.isNormalType = function(type = '') {
    return normalTypeArr.indexOf(type) > -1;
};