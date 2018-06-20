// Converts from degrees to radians.
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};


function distanceFromGrenoble(city)
{
  var GrenobleLat = 45.166667;
  var GrenobleLong = 5.716667;

  var Rayon = 6371e3; // metres
  var φ1 = Math.toRadians(GrenobleLat);
  var φ2 = Math.toRadians(city.latitude);
  var Δφ = Math.toRadians((city.latitude-GrenobleLat));
  var Δλ = Math.toRadians((city.longitude-GrenobleLong));

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = Rayon * c;

  return Math.round(d/1000);
}

function swap(i,j) // Swap the values in array csvData
{
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
  // [csvData[i],csvData[j]] = [csvData[j],csvData[i]]; destructuring asignment array matching.
  let temp = csvData[i];
  csvData[i] = csvData[j];
  csvData[j] = temp;
}

function isLess(A,B)
{
  displayBuffer.push(['compare', A, B]); // Do not delete this line (for display)
  let cityA = csvData[A];
  let cityB = csvData[B];
  console.log("cityA",cityA);
  console.log("cityB",cityB);
  return cityA.dist < cityB.dist;
}


function insertsort()
{// on parcourt le tableau du début à la fin.
  for (let i =1; i < csvData.length; i++){
    for(let k = i; k > 0; k-- ){
      if (isLess(k, k-1)){
        swap(k, k-1);
      }
    }
  }
}

function selectionsort()
{ //recherche le plus grand element (ou petit) le place en fin de tableau(ou début)recommence avec le second.
  for(let i = 0; i < csvData.length; i++ ){
    let k = i;
    for (let j = i+1; j < csvData.length; j++){
      if(isLess(j,k)){
        k = j;
      }
    }
    swap(i,k);
  }
}
function bubblesort()
{ //compare 2valeurs adjacentes et inverse leur position si mal placée.
 for (let i = 0; i < csvData.length; i++){
   let swapped = false;
   for(let j = csvData.length -1; j >= i+1; j--){
     if (isLess(j,j-1)){
       swap(j,j-1);
       swapped = true;
     }
   }
   if (!swapped){
     break;
   }
 } 
}

function shellsort()
{  // calcul de la valeur initiale de h
  let count = 0;
  let h = Math.floor(csvData.length / 3);
  while (h > 0) {
    for (let startPosition = 0; startPosition < h; startPosition++){
      // tri par insertion
      for (let i = startPosition + h; i < csvData.length; i+= h) {
        if(isLess(i, i-h)){
          swap(i, i-h);
        }
      }
    }
    h--;
  }
}   


function mergesort(data)
{
  
}
function heapsort(data)
{
  
}

function quicksort()
{
  quicksort2(0, csvData.length-1);
}

function quicksort2(start, end){
  if( end <= start){
    return;
  }
  let indexPivot = start;
  let k = start;

  for(let i = start + 1; i<= end; i++ ){
    if(isLess (i, indexPivot)){
      swap(++k, i);//incremente avant de le passer.
    }
  }
  swap(k, indexPivot);
  quicksort2(start, k-1);
  quicksort2(k+1, end);
}


function quick3sort(data)
{
  console.log("implement me !");
}



var algorithms = {
  'insert': insertsort,
  'select': selectionsort,
  'bubble': bubblesort,
  'shell': shellsort,
  'merge': mergesort,
  'heap': heapsort,
  'quick': quicksort,
  'quick3': quick3sort
}

function sort(algo)
{
  if (!algorithms.hasOwnProperty(algo)) {
    throw 'Invalid algorithm ' + algo;
  }
  var sort_fn = algorithms[algo];
  sort_fn();
}

