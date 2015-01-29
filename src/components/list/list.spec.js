describe('mdItem directive', function() {
  beforeEach(module('material.components.list', 'material.components.checkbox', 'material.components.switch'));

  function setup(html) {
    var el;
    inject(function($compile, $rootScope) {
      el = $compile(html)($rootScope);
      $rootScope.$apply();
    });
    return el;
  }

  it('forwards click events for md-checkbox', inject(function($rootScope) {
    var listItem = setup('<md-item><md-checkbox ng-model="modelVal"></md-checkbox></md-item>');
    listItem.triggerHandler('click');
    expect($rootScope.modelVal).toBe(true);
  }));

  it('forwards click events for md-switch', inject(function($rootScope) {
    var listItem = setup('<md-item><md-switch ng-model="modelVal"></md-switch></md-item>');
    listItem.triggerHandler('click');
    expect($rootScope.modelVal).toBe(true);
  }));

  it('creates buttons when used with ng-click', function() {
    var listItem = setup('<md-item ng-click="sayHello()"><p>Hello world</p></md-item>');
    var firstChild = listItem.children()[0];
    expect(firstChild.nodeName).toBe('BUTTON');
    expect(firstChild.childNodes[0].nodeName).toBe('P');
  });

  it('warns when using ng-click and proxied elements', inject(function($log) {
    spyOn($log, 'warn');
    var badListItem = setup('<md-item ng-click="sayHello()"><md-switch ng-model="bad"></md-switch></md-item>');
    expect($log.warn).toHaveBeenCalled();
  }));
});
