/*
 * Implement all your JavaScript in this file!
 */
// global variable
var equation = [];
// caculation result
var result = 0.0
// record when we type numbers
var typeNum = false;
// record when we type equals
var typeEquals = false;
// record when we get a new result
var newResult = false;
// when we do multiple equals operation
// we need to record last operand2
var lastOperand2 = "";

// when we click number
$(".number").click(displayNum);
// when we click operator
$(".operator").click(clickOperator);
// when we click operator
$("#equalsButton").click(clickEquals);
// when we click clear
$("#clearButton").click(clickClear);


/* this call back function is used to display numbers*/
function displayNum() {

	// if we want to start a new calculation
	if (newResult)
		equation = [];
	// get type in number
	var num = $(this).val();
	var orig = $("#display").val();
	// clear operand 1 and display operand2
	if (!typeNum)
		$("#display").val(num);
	else {
		// if display has only 0
		if (orig == "0") 
			$("#display").val(num);
		else 
			$("#display").val(orig + num);
	}
	// indicating we just type num 
	typeNum = true;
	typeEquals = false;
	lastOperand2 = "";
	newResult = false;
}

/* this call back function is used when we click operator*/
function clickOperator() {

	// indicating we just type operator
	typeEquals = false;
	lastOperand2 = "";
	newResult = false;

	// push operand and operator into array
	if (typeNum) {
		equation.push($("#display").val());
		equation.push($(this).attr("id"));
		typeNum = false;	
	}

	else if (equation[0]) {
		// update operator
		equation[1] = $(this).attr("id");
	}

	else {
		// update operand1 and operator
		equation[0] = 0;
		equation[1] = $(this).attr("id");
	}

	// debug
	$("#output").html("operand1 is: " + equation[0] + "; operator is: " 
		+ equation[1] +"; operand2 is: " + equation[2]);

	// if there is already a equation
	if (equation.length == 4) {
		calculate(equation[0], equation[1], equation[2]);
		$("#display").val(result);
		// update the equation array
		equation.shift();
		equation.unshift(result);
		// update operator
		equation[1] = equation[3];
		// remove oprand2 and operator
		equation.pop();
		equation.pop();
	}
	
	
}

/* this function is to display when click equals*/
function clickEquals() {

	// if we get a equation, calculate
	if (typeNum) {
		if (equation.length == 3)
			equation[2] = $("#display").val();
		else 
			equation.push($("#display").val());
		typeNum = false;
	}

	// debug
	$("#output").html("operand1 is: " + equation[0] + "; operator is: " 
		+ equation[1] +"; operand2 is: " + equation[2]);

	if (equation.length == 3) {
		calculate(equation[0], equation[1], equation[2]);
		$("#display").val(result);
		// update the equation array
		equation.shift();
		equation.unshift(result);
		// record the last operand2
		lastOperand2 = equation[2];
		equation.pop();
		// indicating we get new Result
		newResult = true;
	}

	// if we keep click equals
	else if (typeEquals && lastOperand2 != "") {
		equation[2] = lastOperand2;
		calculate(equation[0], equation[1], equation[2]);
		$("#display").val(result);
		// update the equation array
		equation.shift();
		equation.unshift(result);
		equation.pop();
		// indicating we get new Result
		newResult = true;
	}

	// indicating we just type equals
 	typeEquals = true;
}

/* this function is to clear*/
function clickClear() {
	// initialization
	$("#display").val(undefined);
	equation = [];
	lastOperand2 = "";
	result = 0.0;
	typeNum = false;
	typeEquals = false;
	newResult = false;
}

/* this function is to calculate result*/
function calculate(operand1, operator, operand2) {
	if (operator == "addButton") 
		result = Number(operand1) + Number(operand2);
	else if (operator == "subtractButton")
		result = Number(operand1) - Number(operand2);
	else if (operator == "multiplyButton")
		result = Number(operand1) * Number(operand2);
	else if (operator == "divideButton")
		result = Number(operand1)/Number(operand2);
}



