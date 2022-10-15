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

$('.setButton').click(function(){
    displayExercisesSet();
})

async function displayExercisesSet(){
    try 
    return;
};

const setElement = document.getElementById('setChart').getContext('2d');
let setLabel = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
let setData = [12, 19, 3, 5, 2, 3];
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