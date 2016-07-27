var roiCalculator = angular.module("roiCalculator",["fcsa-number"]);

roiCalculator.directive('emptyToZero', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(viewValue) {
                if(viewValue == 0) {
                    return "0";
                }
                return viewValue;
            });
        }
    };
});

roiCalculator.controller("calculatorController",function($scope){
	$scope.minSpending = $scope.maxSpending = $scope.yearlyRevenue = $scope.revenuePerCustomer = $scope.visitorPercent = $scope.salesPercent = $scope.leadsPerHundred = $scope.salesPerTen = 0;

	$scope.change = function(){
		alert(change);
	};

	$scope.monthlyRevenue = function(){
		return ($scope.yearlyRevenue/12);
	};

	$scope.salesPerMonth = 0;

	$scope.leadsPerMonth = 0;

	$scope.salesNumber = function(){
		$scope.monthOrYearSales = "month";
		var returnVal = $scope.monthlyRevenue()/$scope.revenuePerCustomer;
		$scope.salesPerMonth = returnVal;
		if(returnVal < 1){
			returnVal = returnVal * 12;
			$scope.monthOrYearSales = "year";
		}
		return returnVal;
	}

	$scope.leadsNumber = function(){
		$scope.monthOrYearLeads = "month";
		var returnVal = $scope.salesPerMonth/($scope.salesPerTen/10);
		$scope.leadsPerMonth = returnVal;
		if(returnVal < 1){
			returnVal = returnVal * 12;
			$scope.monthOrYearLeads = "year";
		}
		return returnVal;
	}

	$scope.visitorsPerMonth = function(){
		var returnVal = ($scope.leadsPerMonth * 100)/$scope.leadsPerHundred;
		return returnVal;
	}

	$scope.minCostPerSale = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.minSpending/100)/$scope.salesPerMonth;
		return returnVal;
	}

	$scope.maxCostPerSale = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.maxSpending/100)/$scope.salesPerMonth;
		return returnVal;
	}

	$scope.minCostPerLead = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.minSpending/100)/$scope.leadsPerMonth;
		return returnVal;
	}

	$scope.maxCostPerLead = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.maxSpending/100)/$scope.leadsPerMonth;
		return returnVal;
	}

	$scope.minCostPerVisitor = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.minSpending/100)/$scope.visitorsPerMonth();
		return returnVal;
	}

	$scope.maxCostPerVisitor = function(){
		var returnVal = $scope.monthlyRevenue()*($scope.maxSpending/100)/$scope.visitorsPerMonth();
		return returnVal;
	}

	$scope.$watch("leadsPerHundred",function(newValue,oldValue){
		if(newValue == 0){
			$scope.leadsPerHundred = "0";
		}
		else if(newValue >= 100){
			$scope.leadsPerHundred = "100";
		}
		else{
			$scope.leadsPerHundred = $scope.leadsPerHundred.replace(/^0+/, '');
		}
	});

	$scope.$watch("salesPerTen",function(newValue,oldValue){
		if(newValue == 0){
			$scope.salesPerTen = "0";
		}
		else if(newValue >= 10){
			$scope.salesPerTen = "10";
		}
		else{
			$scope.salesPerTen = $scope.salesPerTen.replace(/^0+/, '');
		}
	});

	$scope.$watch("revenuePerCustomer", function(newValue,oldValue){
		if(newValue == 0){
			$scope.revenuePerCustomer = "0";
		}
		else{
			$scope.revenuePerCustomer = $scope.revenuePerCustomer.replace(/^0+/, '');;
		}
	});

	$scope.$watch("yearlyRevenue", function(newValue,oldValue){
		if(newValue == 0){
			$scope.yearlyRevenue = "0";
		}
		else{
			$scope.yearlyRevenue = $scope.yearlyRevenue.replace(/^0+/, '');;
		}
	});

	$scope.$watch("minSpending", function(newValue,oldValue){
		if(newValue == 0){
			$scope.minSpending = "0";
		}
		else{
			$scope.minSpending = $scope.minSpending.replace(/^0+/, '');;
		}
	});

	$scope.$watch("maxSpending", function(newValue,oldValue){
		if(newValue == 0){
			$scope.maxSpending = "0";
		}
		else{
			$scope.maxSpending = $scope.maxSpending.replace(/^0+/, '');;
		}
	});
});