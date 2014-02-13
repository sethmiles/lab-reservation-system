//Global service for global variables
angular.module('lrs').factory("Global", [
  function() {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: !! window.user,
      isAdmin: (window.user && window.user.role === 'admin')
    };

    return _this._data;
  }
]);
