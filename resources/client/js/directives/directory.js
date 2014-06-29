(function (ng) {
    ng.module('batmanApp', []).directive('batmanDirectory', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }

                element.on('change', function (e) {
                    var value = this.value;
                    scope.$apply(function () {
                        ngModel.$setViewValue(value);
                    });
                });
            }
        };
    });
}(this.angular));
