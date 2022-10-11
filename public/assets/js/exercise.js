//exercise section

//validation
let textInputVal = $('.text');
//check for all text input is either text, backspace or space
textInputVal.onkeydown = function (e) {
    if (!((e.keyCode > 64 && e.keyCode < 91)
        || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 46)) {
        return false;
    }
}

//Buttons
//exercise button functionality
$("#exerBtn").click(function () {
    $('.nutrition').hide();
    $(".bmiSection").hide();
    $('.exercise').show();
});

//function to show new workout modal
$(".newWorkoutBtn").click(function () {
    $('.createWorkout').show();
    $(".searchSection").show();
});

//button used to submit criteria to API
$(".searchSave").click(function () {
    exerciseSearch();
    $('.searchResultSection').show();
});

//toggle saved exercise on and off
$('.savedExercises').click(function () {
    $(".saved-exercise-body").toggle();
  
   
})

//button to show more info on exercises
$(".exercise-selection-body").on('click', '.moreBtn', function () {
    $(this).next().toggle();
});

//button to open up setup section
$(".setupBtn").click(function () {
    let cWorkouts = localStorage.getItem("workouts");
    if (cWorkouts) {
        $('.savedSection').hide();
        $('.searchResultSection').hide();
        $(".searchSection").hide();
        $(".setupSection").removeClass('is-hidden');
        $(".setupSection").addClass('is-flex');
        $('.finishBtn').show();
        startSetup();
    } else {
        alert('Must have workouts saved to proceed to setup.');
    }

})

//button to save program into local storage
$(".finishBtn").submit((event) => {
    $('.sessionSection').show();
    finishSetup();
    $('.sessionSection').show();
    event.preventDefault();
});

//button for remove button within saved exercises section
$(".remove-button").click(function () {
    localStorage.setItem("workouts", '');
    $('.saved-exercise-body').empty();
    $(".setupSection").hide();
});

//button to close out buttons in exercise modals
$('.delete, .cancel-button').click(function () {
    $(".modal").hide();
    $('.finishBtn').hide();
    $(".setupSection").removeClass('is-flex');
    $(".setupSection").addClass('is-hidden');
});

//button to save all inputted info from session to database
$(".save_db").submit(async (e) => {
    saveToDB();
    e.preventDefault();
});

// //remove button both removes the row from the display and local storage
// $(".exerciseLog").on('click', '.removeBtn', function () {
//     $(this).closest('tr').remove();
// })

//called functionalities

//searches and displays searches to page
function exerciseSearch() {
    $('.exercise-selection-body').empty();

    $('.modal').show();

    //check the user inputs fo intensity, type, and muscle
    let intensityValue = $("#intensityOptions").val();
    let typeValue = $("#typeOptions").val();
    let muscleValue = $("#muscleOptions").val();
    let requestUrl = 'https://api.api-ninjas.com/v1/exercises?'

    //variables used to hold & if needed
    let intensityAnd = '';
    let typeAnd = '';

    //add section to URL depending on user input
    if (muscleValue.length) {
        requestUrl = requestUrl + 'muscle=' + muscleValue;
        intensityAnd = '&';
        typeAnd = '&';
    }
    if (intensityValue.length) {
        requestUrl = requestUrl + intensityAnd + 'difficulty=' + intensityValue;
        typeAnd = '&';
    }
    if (typeValue.length) {
        requestUrl = requestUrl + typeAnd + 'type=' + typeValue;
    }

    //send API request using the user input  
    fetch(requestUrl, {
        headers: {
            'X-Api-Key': 'GKg0l9hlc0fRJEHUdIsVzw==lti9bU3OVAYwF8Wk'
        }
    }).then(function (response) { return response.json(); })
        .then(function (data) {
            //if data returned is empty error message is displayed
            if (data.length === 0) {
                $('.exercise-selection-body').text("No Results Found")
                return
            }

            //add data returned as input selectors within the modal
            for (let i = 0; i < data.length; i++) {
                //create object for each workout returned
                let name = data[i].name
                let equipment = data[i].equipment
                let instructions = data[i].instructions

                //add workout to 
                let results = $(`<input type="radio" name="result" 
                data-name="${name}" data-equipment="${equipment}" data-instructions="${instructions}"/>
                <span>${name}</span>
                    <button class="moreBtn">
                      More
                  </button>
                  <div class='moreInfo'>  
                      <p><span>Equipment:&nbsp;</span>${equipment}</p>
                      <p><span>Instructions:&nbsp;</span>${instructions}</p>
                      </div>`);
                
                //listens to change in any of the seledtable workout and executes if so
                results.on("change", saveworkout)
                $('.exercise-selection-body').append(results)
            }
        });
}

//function used to save selected workouts into local storage
function saveworkout() {

    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }

    //because this function is called as its listening on an object, it can call the dataset information
    //for this specific select, and put it in an object
    let workout = {
        name: this.dataset.name,
        equipment: this.dataset.equipment,
        instructions: this.dataset.instructions,
    }
    workouts.push(workout)
    //however it is only saved if the save button is clicked
    $(".exerciseSave").on("click", function () {
        localStorage.setItem("workouts", JSON.stringify(workouts));
        $('.saved-exercise-body').show();
        $('.savedSection').show();
        displayWorkout();
    })
}

//workouts pulled from local storage and displayed in saved exercise section
function displayWorkout() {
    $('.saved-exercise-body').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }

    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name
        let results = $(`<div><h5>${name}</h5></div>`);
        $('.saved-exercise-body').append(results);
    }
}

//function to display dynamic input request for workout setup information
function startSetup() {
    $('.setupSection').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    let programName = `<input id="workoutName" type="text" placeholder="Workout Name" required>`;
    $('.setupSection').append(programName);
    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name;
        let results = $(`<div class='setupInputs'><h5 class='exerciseName'>${name}</h5></div>
        <span>
        <label for="${i}Set">Set Amount</label>
        <input id="${i}Set" type="number" min="0" placeholder="4" required>
        </span>
        <span>
        
        <label for="${i}Reps">Goal Reps&nbsp;</label>
        <input id="${i}Reps" type="number" min="0" placeholder="12" required>
        </span>
        <span>
        <label for="${i}Weight">Weight Goal</label>
        <input placeholder="lbs" id="${i}Weight" type="number" min="0" required>
        </span>
        <span>
        <label for="${i}Type">Weight Type</label>
        <input placeholder="dumbbell" id="${i}Type" type="text" class='text' required>
        </span>
        </br>`);
        $('.setupSection').append(results);
    }
}

//function to save new workout to local stroage and display
function finishSetup() {
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    console.log('1');
    let workoutsProgram = [];
    let workoutName = $('#workoutName').val();
    workoutsProgram.push(workoutName);

    //save all user inputs into an array of objects
    for (let i = 0; i < workouts.length; i++) {
        let exerciseObject = {
            name: workouts[i].name,
            sets: $(`#${i}Set`).val(),
            reps: $(`#${i}Reps`).val(),
            weight: $(`#${i}Weight`).val(),
            type: $(`#${i}Type`).val()
        }
        workoutsProgram.push(exerciseObject); 
    }
    console.log('2');
    //save array of objects into local storage
    localStorage.setItem("setupWorkout", JSON.stringify(workoutsProgram));
    $('.modal').hide();
    displaySetupWorkout();
}

//display new program created to main exercise section
function displaySetupWorkout() {
    $('.exerciseName').empty();
    $('.exerciseTable').empty();
    $('.sessionSection').show();

    let workoutProgram = JSON.parse(localStorage.getItem("setupWorkout"));
    if (!workoutProgram){
        return;
    }
    let logBody = $('.exerciseLog');
    logBody.append($(`<br><div><h3 class='program'>${workoutProgram[0]}</h3></div>`));
    //i starts at 1, remember that when pulling information
    for (let i = 1; i < workoutProgram.length; i++) {
        logBody.append($(`<br><h4 class='exerciseName' id="workout${i}">${workoutProgram[i].name}</h4>`));
        let workoutTable = $('<table class="exerciseTable">');
        let tableHeader = $(`<tr>
        <th>Set</th>
        <th>Reps</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Comments</th>
    </tr>`);
        workoutTable.append(tableHeader);
        for (let e = 0; e < workoutProgram[i].sets; e++) {
            let tableRow = $(`<tr>
            <td class='set${i} set${i}${e}' id='set${i}${e}'>${e + 1}</td>
            <td><input id='reps${i}${e}' type="number" min="0" size="6" placeholder="${workoutProgram[i].reps}" required></td>
            <td><input id='weight${i}${e}' type="number" min="0" size="6" placeholder="${workoutProgram[i].weight}" required></td>
            <td><input id='type${i}${e}' class='text' type="text" size="10" placeholder="${workoutProgram[i].type}" required></td>
            <td><input id='comments${i}${e}' class='text' size="10" type="text" ></td>
        </tr>`)
        //<td><button class="removeBtn delete">X</button></td>
            workoutTable.append(tableRow);
        }
        logBody.append(workoutTable);
    }

}

//function to save all inputted information to database
async function saveToDB() {
    try {
        //push session date to DB
        let chosenDate = $(".date").val();
        let sessionObject = {
            date: chosenDate
        }
        let postUrl = `/api/session/`;
        let id;
        let useless = await postData(postUrl, sessionObject);

        //get the id for the date just saved
        let url = `/api/session/${chosenDate}`;
        let dateObject = await getExerData(url);
        id = dateObject.id;
        let sessionWktArray = [];


        //pull all inputted information from the workout to an array of objects
        //per workout/table
        for (let i = 1; i < $(".exerciseTable").length + 1; i++) {
            //e needs to change for each i
            //per table rows
            for (let e = 0; e < $(`.set${i}`).length; e++) {
                let exercise_name = document.getElementById(`workout${i}`);
                let set_number = document.getElementById(`set${i}${e}`);
                let rep_amount = $(`#reps${i}${e}`).val();
                let weight = $(`#weight${i}${e}`).val();
                let weight_type = $(`#type${i}${e}`).val();
                let comments = $(`#comments${i}${e}`).val();

                let sessionWkt = {
                    session_id: id,
                    exercise_name: exercise_name.textContent,
                    set_number: set_number.textContent,
                    rep_amount: rep_amount,
                    weight: weight,
                    weight_type: weight_type,
                    comments: comments
                }
                sessionWktArray.push(sessionWkt);
            }
        }
        console.log(sessionWktArray);
        //push all workouts to data base
        let workoutUrl = `/api/session/wkts/`;
        let another = await postDataWkt(workoutUrl, sessionWktArray);
        // need to call for some reason for api to work
        if(another){
            alert("Workout Saved Succesfully");
        }
        
    }
    catch (err) {
        console.log(err);
    }
}

//get data function
async function getExerData(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

//function to post data, used for session date
async function postData(url, data) {
    try {
        let response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
    }
    catch (err) {
        console.log('failure');
    }
}

//function tp push all workouts for session dats
async function postDataWkt(url = '', data = []) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//init function
let programCheck = JSON.parse(localStorage.getItem("setupWorkout"));
    if (programCheck){
        console.log('show');
        $('.sessionSection').show();
        displaySetupWorkout();
    }

