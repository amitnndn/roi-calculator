
roiCalculator.directive('format', ['$filter', function ($filter) {
    return {
            /*require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;


                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue)
                });


                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                    return plainNumber;
                });
            }*/
    };
}]);

$(function(){
    $('input#decimal').on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });

    $('#number').keyup(function(e)
                                {
        if (/\D/g.test(this.value))
        {
            this.value = this.value.replace(/\D/g, '');
        }
    });

});

function roundDecimals(num, noOfPrecisions){
    var precision = Math.pow(10,noOfPrecisions);
    return Math.round(num * precision) / precision;
}

function addSeparatorsNF(nStr, inD, outD, sep){
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
}

function FormatAsThousands(amount, noOfPrecisions){
    amount = (noOfPrecisions > 0) ? roundDecimals(amount, noOfPrecisions) : Math.round(amount);
    return addSeparatorsNF(amount,'.','.',',');
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
};