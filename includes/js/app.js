var roiCalculator = angular.module("roiCalculator",["fcsa-number"]);

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
});