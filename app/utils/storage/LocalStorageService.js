const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setUserToken(tokenObj) {
    localStorage.setItem("user_token", tokenObj);
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj);
    localStorage.setItem("refresh_token", tokenObj);
  }
  function _getUserToken() {
    return localStorage.getItem("user_token");
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    setUserToken: _setUserToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getUserToken: _getUserToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
