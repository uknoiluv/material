(function () {
  'use strict';

  angular
      .module('material.components.tabs')
      .directive('mdTab', MdTab);

  function MdTab () {
    return {
      require: '^mdTabs',
      terminal: true,
      scope: {
        label: '@',
        mdActive: '=?',
        ngDisabled: '=?'
      },
      link: link
    };

    function link (scope, element, attr, tabsCtrl) {
      var tabs = element.parent()[0].getElementsByTagName('md-tab'),
          index = Array.prototype.indexOf.call(tabs, element[0]),
          data = tabsCtrl.insertTab({
            scope: scope,
            parent: scope.$parent,
            index: index,
            template: getTemplate(),
            label: getLabel()
          }, index);

      scope.$on('$destroy', function () { tabsCtrl.removeTab(data); });

      function getLabel () {
        //-- if label provided, then send label
        if (attr.label) return attr.label;
        //-- otherwise, we have to search for the `md-tab-label` element
        var label = element.find('md-tab-label');
        if (label) return label.html();
        //-- otherwise, we have no label.
        return 'Missing Label';
      }

      function getTemplate () {
        var content = element.find('md-tab-content');
        return content.length ? content.html() : attr.label ? element.html() : null;
      }
    }
  }
})();
