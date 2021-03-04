export const getParams = function(url) {
    const _url = url || window.location.href
    const index = _url.indexOf('?')
    const params = {}
    if (index !== -1) {
        _url.substring(index + 1).split('&').forEach(item => {
            const arr = item.split('=')
            params[arr[0]] = arr[1]
        })
    }
    return params
}