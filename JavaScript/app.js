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

  index1 = randomNumber(0, Picture.all.length - 1);

  image1.src = Picture.all[index1].path;
  image1.title = Picture.all[index1].name;
  Picture.all[index1].times++;



  index2 = randomNumber(0, Picture.all.length - 1);


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


  index3 = randomNumber(0, Picture.all.length - 1);

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
      console.log(count);
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
    let liElement = document.createElement('li');
    liElement.textContent = `${Picture.all[i].name} had ${Picture.all[i].votes} votes, and was seen ${Picture.all[i].times} times`;
    ulElement.appendChild(liElement);

  }
  //   console.log(Picture.all);
}



