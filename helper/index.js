const normalTypeArr = ['string', 'object', 'boolean'];

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
        return '_set' + name.replace(/^\S/, function(s) {
            return s.toUpperCase();
        });
    }
    return name;
};
/**
 * @param {Object} type  object, string, boolean is Normal Type
 */
exports.isNormalType = function(type = '') {
    return normalTypeArr.indexOf(type) > -1;
};