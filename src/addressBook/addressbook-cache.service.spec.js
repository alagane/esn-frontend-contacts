'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The AddressbookCache service', function() {

  var ContactAPIClientMock;
  var BOOK_ID = '123456789';
  var BOOK_NAME = 'contacts';

  beforeEach(function() {
    ContactAPIClientMock = {};
    angular.mock.module('esn.contact.libs', function($provide) {
      $provide.value('ContactAPIClient', ContactAPIClientMock);
      $provide.value('CONTACT_ADDRESSBOOK_TTL', '60000');
    });
  });

  beforeEach(angular.mock.inject(function(AddressbookCache) {
    this.AddressbookCache = AddressbookCache;
  }));

  it('cache loader should fetch the AB from ContactAPIClient', function(done) {
    ContactAPIClientMock.addressbookHome = function(id) {
      expect(id).to.equal(BOOK_ID);

      return {
        addressbook: function(name) {
          expect(name).to.equal(BOOK_NAME);

          return {
            get: done
          };
        }
      };
    };
    this.AddressbookCache.loader({ bookId: BOOK_ID, bookName: BOOK_NAME });
  });

  it('cache keyBuilder should build key from bookId and bookName', function() {
    expect(this.AddressbookCache.getKey({ bookId: BOOK_ID, bookName: BOOK_NAME })).to.equal(BOOK_ID + '-' + BOOK_NAME);
  });
});
