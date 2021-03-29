'use strict';
let imageSection = document.getElementById('imageSection');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let result = document.getElementById('btnResult');
let ulDiv = document.getElementById('ulDiv');


let index1;
let index2;
let index3;

let holdIndex1;
let holdIndex2;
let holdIndex3;

let viewsArray = [];
let votesArray = [];

let count = 1;

result.style.visibility = 'hidden';



function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass'
];


function Picture(name) {
  this.name = name;
  this.path = `./img/${this.name}.jpg`;
  this.times = 0;
  this.votes = 0;
  Picture.all.push(this);
}

Picture.all = [];

for (let i = 0; i < names.length; i++) {
  new Picture(names[i]);
}
// console.table(Picture.all);

function render() {
  
  
  while(index1 === holdIndex1 || index1 === holdIndex2 || index1 === holdIndex3){
    index1 = randomNumber(0, Picture.all.length - 1);
  }

  console.log(holdIndex1);
  image1.src = Picture.all[index1].path;
  image1.title = Picture.all[index1].name;
  Picture.all[index1].times++;


 
  
  while(index2 === holdIndex1 || index2 === holdIndex2 || index2 === holdIndex3){
    index2 = randomNumber(0, Picture.all.length - 1);
  }
  console.log(holdIndex2);
  if (index2 !== index1) {
    image2.src = Picture.all[index2].path;
    image2.title = Picture.all[index2].name;
    Picture.all[index2].times++;

  }
  else if (index2 === 0) {
    index2++;
    image2.src = Picture.all[index2].path;
    image2.title = Picture.all[index2].name;
    Picture.all[index2].times++;

  }
  else {
    index2--;
    image2.src = Picture.all[index2].path;
    image2.title = Picture.all[index2].name;
    Picture.all[index2].times++;

  }


  
  while(index3 === holdIndex1 || index3 === holdIndex2 || index3 === holdIndex3){
    index3 = randomNumber(0, Picture.all.length - 1);
  }
  console.log(holdIndex3);

  if (index3 !== index1 && index3 !== index2) {
    image3.src = Picture.all[index3].path;
    image3.title = Picture.all[index3].name;
    Picture.all[index3].times++;

  }
  else if (index3 === 0) {
    while (index3 === index1 || index3 === index2) {
      index3++;
    }

    image3.src = Picture.all[index3].path;
    image3.title = Picture.all[index3].name;
    Picture.all[index3].times++;

  }
  else {
    while (index3 === index1 || index3 === index2) {
      index3--;
    }

    image3.src = Picture.all[index3].path;
    image3.title = Picture.all[index3].name;
    Picture.all[index3].times++;

  }
  holdIndex1 = index1;
  holdIndex2 = index2;
  holdIndex3 = index3;



}

render();

imageSection.addEventListener('click', handelClick);

function handelClick(event) {
  //   event.preventDefault();
  if (count === 25) {
    alert('No more Picture , you reach 25 rounds');
  }
  else {
    if (event.target.id !== 'imageSection') {
      if (event.target.id === image1.id) {
        Picture.all[index1].votes++;
      }
      else if (event.target.id === image2.id) {
        Picture.all[index2].votes++;
      }
      else {
        Picture.all[index3].votes++;
      }
    }
    //   console.table(Picture.all);
    render();
    count = count + 1;
    if (count < 25) {
      result.style.visibility = 'hidden';
      // console.log(count);
    }
    else {
      result.style.visibility = 'visible';
      console.log(count);



    }
  }
}
let ulElement = document.createElement('ul');
ulDiv.appendChild(ulElement);
result.addEventListener('click', resultFunc);

function resultFunc() {
  ulElement.textContent = '';
  for (let i = 0; i < Picture.all.length; i++) {
    // let liElement = document.createElement('li');
    // liElement.textContent = `${Picture.all[i].name} had ${Picture.all[i].votes} votes, and was seen ${Picture.all[i].times} times`;
    // ulElement.appendChild(liElement);
    viewsArray.push(Picture.all[i].times);
    votesArray.push(Picture.all[i].votes);

  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Photo\'s Votes',
        backgroundColor: 'rgb(255, 230, 1)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesArray
      },
      {
        label: 'Photo\'s Views',
        backgroundColor: 'tomato',
        borderColor: 'rgb(253, 46, 46)',
        data: viewsArray
      }]
    },

    // Configuration options go here
    options: {}
  });
}





