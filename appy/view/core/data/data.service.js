angular.module('core.data')
.service('Data', [
  '$http',
  'Auth',
  function Data($http, Auth) {
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ Auth.getToken()
        }
      });
    }
  }
]);