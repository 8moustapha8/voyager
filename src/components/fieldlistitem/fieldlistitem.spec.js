'use strict';

describe('Directive: fieldListItem', function() {

  // load the directive's module
  beforeEach(module('voyager'));

  var element,
    scope;

  beforeEach(module('voyager', function($provide) {
    var mock = {
      schema: ['foo', 'bar', 'baz']
    };
    $provide.value('Dataset', mock);
  }));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
    scope.field = {
      selected: false
    };
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<field-list-item field="field"></field-list-item>');
    element = $compile(element)(scope);
    scope.$digest();

    expect(element.find('.field').length).to.eql(3);
  }));
});
