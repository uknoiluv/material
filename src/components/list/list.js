(function() {
'use strict';

/**
 * @ngdoc module
 * @name material.components.list
 * @description
 * List module
 */
angular.module('material.components.list', [
  'material.core'
])
  .directive('mdList', mdListDirective)
  .directive('mdItem', mdItemDirective);

/**
 * @ngdoc directive
 * @name mdList
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-list>` directive is a list container for 1..n `<md-item>` tags.
 *
 * @usage
 * <hljs lang="html">
 * <md-list>
 *   <md-item ng-repeat="item in todos">
 *     <md-item-content>
 *       <div class="md-tile-left">
 *         <img ng-src="{{item.face}}" class="face" alt="{{item.who}}">
 *       </div>
 *       <div class="md-tile-content">
 *         <h3>{{item.what}}</h3>
 *         <h4>{{item.who}}</h4>
 *         <p>
 *           {{item.notes}}
 *         </p>
 *       </div>
 *     </md-item-content>
 *   </md-item>
 * </md-list>
 * </hljs>
 *
 */
function mdListDirective() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      $element.attr({
        'role' : 'list'
      });
    }
  };
}

/**
 * @ngdoc directive
 * @name mdItem
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-item>` directive is a container intended for row items in a `<md-list>` container.
 *
 * @usage
 * <hljs lang="html">
 *  <md-list>
 *    <md-item>
 *            Item content in list
 *    </md-item>
 *  </md-list>
 * </hljs>
 *
 */
function mdItemDirective($document, $log) {
  var proxiedTypes = ['md-checkbox', 'md-switch'];
  return {
    restrict: 'E',
    compile: function(tEl, tAttrs) {
      if (tAttrs.ngClick) {
        // Check for proxy controls and warn 
        for (var i = 0, type; type = proxiedTypes[i]; ++i) {
          if (tEl[0].querySelector(type)) {
            $log.warn('dont use ng-click on md-item\'s with controls in them');
            return postLink;
          }
        }
        var containerButton = angular.element('<button class="md-no-style">');
        tEl.append(containerButton.append(tEl.contents()));
      }
      return postLink;

      function postLink($scope, $element, $attr) {
        $element.attr({
          'role' : 'listitem'
        });

        var proxies = [];
        angular.forEach(proxiedTypes, function(type) {
          angular.forEach($element[0].querySelectorAll(type), function(child) {
            proxies.push(child);
          });
        });
        if (proxies.length) { $element.addClass('md-clickable'); }
        $element.on('click', function(e) {
          angular.forEach(proxies, function(proxy) {
            if (e.target !== proxy && !proxy.contains(e.target)) {
              angular.element(proxy).triggerHandler('click');
            }
          });
        });
      }
    }
  };
}
})();
