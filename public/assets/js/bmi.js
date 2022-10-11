//BMI input validation
let bmiInput = $('#weight', '#height');

bmiInput.onkeydown = function (e) {
    //allows only numbers and backspace to be inputted
    if (!((e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        return false;
    }
}

//Button to open up BMI section
$("#bmiBtn").click(function () {
    $('.nutrition').hide();
    $('.exercise').hide();
    $('.bmiSection').show();
});

//button to submit bmi input
$('.bmiSubmit').click(function () {
    calculateBmi();
});

//function is called on html, used to calculate BMI and display the appropriate information
function calculateBmi() {
    let weight = $("#weight").val();
    let height = $("#height").val();
    let bmi = (weight / (height * height) * 703).toFixed(1).toString();

    $("#heading").text("Your BMI is");
    $("#bmi-output").text(bmi);


    if (bmi <= 18.4) {
        $("#message").text("You are underweight.");
    } else if (bmi <= 25 && bmi >= 18.4) {
        $("#message").text("You have a healthy weight.");
    } else {
        $("#message").text("You are overweight.");
    }
}
