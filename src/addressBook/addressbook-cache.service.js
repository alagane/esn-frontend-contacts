require('../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .factory('AddressbookCache', AddressbookCache);

  function AddressbookCache(
    $log,
    ContactAPIClient,
    Cache,
    CONTACT_ADDRESSBOOK_TTL
  ) {
    return new Cache({
      loader: function(options) {
        $log.debug('Loading addressbook from cache', options);

        return ContactAPIClient.addressbookHome(options.bookId).addressbook(options.bookName).get();
      },
      keyBuilder: function(options) {
        return options.bookId + '-' + options.bookName;
      },
      ttl: CONTACT_ADDRESSBOOK_TTL
    });
  }
})(angular);
