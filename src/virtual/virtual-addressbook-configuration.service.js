require('./virtual-addressbook-registry.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs').factory('ContactVirtualAddressBookConfiguration', ContactVirtualAddressBookConfiguration);

  function ContactVirtualAddressBookConfiguration($q, esnConfig, ContactVirtualAddressBookRegistry) {
    return {
      isEnabled: isEnabled
    };

    function isEnabled(id) {
      return ContactVirtualAddressBookRegistry.get(id).then(function(addressbook) {
        if (!addressbook) {
          return $q.reject(new Error(id + ' is not a valid addressbook'));
        }

        return esnConfig(addressbook.options.configuration.enabled, true);
      });
    }
  }

})(angular);
