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
        $(this).parent().find('label.form-control').css('z-index', '2');
        $(this).parent().find('input.decimal-input').focus();
    })

    $(document).on('focus', 'label.form-control', function(){
        $(this).parent().find('label.form-control').css('z-index', '2');
        $(this).parent().find('input.decimal-input').focus();
    })

    $(document).on('focus', 'input.decimal-input', function(){
        $(this).parent().find('label.form-control').css('z-index', '2');
    })

    $(document).on('blur', 'label.form-control', function(){
        $(this).parent().find('label.form-control').css('z-index', '5');
    })

    $(document).on('blur', 'input.decimal-input', function(){
        $(this).parent().find('label.form-control').css('z-index', '5');
    })

    $('input.decimal-input').keypress(function(e) {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });

    $('#number').keypress(function(e){
        if (/\D/g.test(this.value))
        {
            this.value = this.value.replace(/\D/g, '');
        }
    });

});

function validateQty(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key == 8 || key == 46 || key == 37 || key == 39 || key == 0) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
}