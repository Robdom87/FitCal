// import Chart from 'chart.js';


let bgColorArr = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
let bColorArr = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

let setLabel = [];
let setData = [];

$('.setButton').click(function () {
    displayExercisesSet();
})

async function displayExercisesSet() {
    let url = `/api/chart/exercises`;
    let data = await helpers.getData(url);
    let checkboxes = $('.setCheckboxes');
    checkboxes.empty();
    for (let i = 0; i < data.length; i++) {
        let checkbox = `<input type="checkbox" class='exerciseCheckBox' id="${data[i].exercise_name}" name="exercises" value="${data[i].exercise_name}" />
                        <label for="${data[i].exercise_name}">${data[i].exercise_name}</label>`;
        checkboxes.append(checkbox);
    }
    listenCheckboxes();
    return;
};

async function listenCheckboxes() {
    let allCheckboxes = document.querySelectorAll('.exerciseCheckBox');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async function () {
            if (this.checked) {
                try {
                    let exerciseName = $(this).val();
                    setLabel.push(exerciseName);
                    //find data for exercise
                    let url = `/api/chart/exercise?name=${exerciseName}`;
                    let data = await helpers.getData(url);
                    //add to displayed data
                    setData.push(data.set_count);
                    printSetChart();
                }
                catch {
                    console.log(err.message);
                }
            } else {
                //remove exercise from data in chart
                let exerciseName = $(this).val();
                let index = setLabel.indexOf(exerciseName);
                setLabel.splice(index, 1);
                setData.splice(index, 1);
                printSetChart();
            }
        })
    })
}

function printSetChart() {
    let setChartCont = $('.setChartContainer');
    setChartCont.empty();
    let setChartHtml = `<canvas id="setChart"></canvas>`;
    setChartCont.append(setChartHtml);
    const setElement = document.getElementById('setChart').getContext('2d');
    const SetChart = new Chart(setElement, {
        type: 'bar',
        data: {
            labels: setLabel,
            datasets: [{
                label: '# of Sets',
                data: setData,
                //backgroundColor: bgColorArr,
                // borderColor: bColorArr,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



// const SetChart = new Chart(setElement, {
//     type: 'bar',
//     data: {
//         labels: setLabel,
//         datasets: [{
//             label: '# of Sets',
//             data: setData,
//             //backgroundColor: bgColorArr,
//             // borderColor: bColorArr,
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });