We are adding a feature - calculator MpG to L/100KM
Acceptance criteria:
1. The calculation works correctly for the test data: 20mpg=11.76L/100km; 30mpg=7.84L/100km; 40mpg=5.88L/100km; (reference mile is 1.60934km, reference gallon is 3.78541178 liters)
2. It is allowed to enter numbers (up to 2 decimal places).
3. It is impossible to enter/insert other characters except digits and comma as a separator (minus is also impossible).
4. For an entered zero, the output is zero
5. The result must be displayed in large bold numbers (with rounding to 2 decimal places using the HALF_UP method).