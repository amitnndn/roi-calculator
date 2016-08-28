
roiCalculator.directive('format', ['$filter', function ($filter) {
    return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;


                ctrl.$formatters.unshift(function (a) {
                    var returnVal = rounding.FormatAsThousands(Number(ctrl.$modelValue),2);
                    return returnVal;
                    //return $filter(attrs.format)(ctrl.$modelValue)
                });


                ctrl.$parsers.unshift(function (viewValue) {
                    /*var returnVal = rounding.FormatAsThousands(Number(viewValue),2);
                    console.log(returnVal);
                    return returnVal;*/
                    var plainNumber = viewValue.toString().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val(plainNumber);
                    return plainNumber;
                });
            }
    };
}]);

$(function(){
    $(document).on('click', 'label.form-control', function(){
        $(this).parent().find('label.form-control').hide();
        $(this).parent().find('input.decimal-input').show().focus();
    })

    $(document).on('focus', 'label.form-control', function(){
        $(this).parent().find('label.form-control').hide();
        $(this).parent().find('input.decimal-input').show().focus();
    })

    $(document).on('blur', 'label.form-control', function(){
        $(this).parent().find('label.form-control').show();
        $(this).parent().find('input.decimal-input').hide();
    })

    $(document).on('blur', 'input.decimal-input', function(){
        $(this).parent().find('label.form-control').show();
        $(this).parent().find('input.decimal-input').hide();
    })
    
});

var rounding = (function () {
  "use strict";
    return {
        FormatAsThousands: (function (amount,noOfPrecisions) {
            amount = (noOfPrecisions > 0) ? this.roundDecimals(amount, noOfPrecisions) : Math.round(amount);
            var returnVal = this.addSeparatorsNF(amount,'.','.',',');
            return returnVal;
        }),
        addSeparatorsNF: (function (nStr, inD, outD, sep) {
            nStr += '';
            var dpos = nStr.indexOf(inD);
            var nStrEnd = '';
            if (dpos != -1) {
                nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
                nStr = nStr.substring(0, dpos);
            }
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(nStr)) {
                nStr = nStr.replace(rgx, '$1' + sep + '$2');
            }
            return nStr + nStrEnd;
        }),
        roundDecimals : (function(num, noOfPrecisions){
            var precision = Math.pow(10,noOfPrecisions);
            return Math.round(num * precision) / precision;
        })
   };
}());

function roundDecimals(num, noOfPrecisions){
    var precision = Math.pow(10,noOfPrecisions);
    return Math.round(num * precision) / precision;
}

function addSeparatorsNF(nStr, inD, outD, sep){
    
}

function FormatAsThousands(amount, noOfPrecisions){
    
}

function validateQty(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
}