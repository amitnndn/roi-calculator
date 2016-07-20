var app = angular.module("angular-decimals", []);
app.directive("decimals", function ($filter) {
    return {
        restrict: "A", // Only usable as an attribute of another HTML element
        require: "?ngModel",
        scope: {
            decimals: "@",
            decimalPoint: "@"
        },
        link: function (scope, element, attr, ngModel) {
            var decimalCount = parseInt(scope.decimals) || 2;
            var decimalPoint = scope.decimalPoint || ".";

            // Run when the model is first rendered and when the model is changed from code
            ngModel.$render = function() {
                if (ngModel.$modelValue != null && ngModel.$modelValue >= 0) {
                    if (typeof decimalCount === "number") {
                        element.val(ngModel.$modelValue.toFixed(decimalCount).toString().replace(".", ","));
                    } else {
                        element.val(ngModel.$modelValue.toString().replace(".", ","));
                    }
                }
            }

            // Run when the view value changes - after each keypress
            // The returned value is then written to the model
            ngModel.$parsers.unshift(function(newValue) {
                if (typeof decimalCount === "number") {
                    var floatValue = parseFloat(newValue.replace(",", "."));
                    if (decimalCount === 0) {
                        return parseInt(floatValue);
                    }
                    return parseFloat(floatValue.toFixed(decimalCount));
                }
                
                return parseFloat(newValue.replace(",", "."));
            });

            // Formats the displayed value when the input field loses focus
            element.on("change", function(e) {
                var floatValue = parseFloat(element.val().replace(",", "."));
                if (!isNaN(floatValue) && typeof decimalCount === "number") {
                    if (decimalCount === 0) {
                        element.val(parseInt(floatValue));
                    } else {
                        var strValue = floatValue.toFixed(decimalCount);
                        element.val(strValue.replace(".", decimalPoint));
                    }
                }
            });
        }
    }
});