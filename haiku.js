var fs = require('fs');
//console.log( fs.readFileSync('./cmudict.txt') );

function readFile(file){
  return fs.readFileSync(file).toString();
}

var text = readFile('./cmudict.txt');

// function syllables(str){ //returns null or a number of syllab
//   var regex = /\d+/ig
//   if(str.match(regex) === null || str === null || str === undefined){
//     return null;
//   }else{
//   return str.match(regex).length;
//   }
// }

// function formatData(data){    
//   var lines = data.toString().split("\n"), lineSplit, words = [[]];
//   lines.forEach(function(line){    
//     lineSplit = line.split("  ");  //lineSplit = ['ZYMAN', 'Z AY1 M AH0 N'] (formatted for each word)
//     var numSyllab = syllables(lineSplit[1]);
//     if(numSyllab !== null) {
//       if(words[numSyllab] === undefined){
//         words[numSyllab] = [];
//       }
//       words[numSyllab].push(lineSplit[0]);
//     }
//     else{
//       words[0].push(lineSplit[0]);
//     }
     
//   });   
//     console.log(words);
//     //return words;
// }


function formatData(data){
  var lines = data.toString().split("\n"), lineSplit, words =[[]];
  var regex = /(\w)+(\d)+/ig;
  var re = /(\w)+\((\d)\)/ig

  lines.forEach(function(line){
    lineSplit = line.split("  ");
    if(lineSplit[1] === null || lineSplit[1] === undefined || lineSplit[1].match(regex) === null || lineSplit[0].match(re) ){
      words[0].push(lineSplit[0])
    } else {
      var numSyllab = lineSplit[1].match(/\d+/g).length;
      if(words[numSyllab] === undefined){
        words[numSyllab] =[];
      }
        words[numSyllab].push(lineSplit[0]);
    }
    
  });
  //console.log(words);
  return words; 
  //returns an array of words where the numSyllab === the index
  //ie words[3] ===> ['abducted', 'abolish', etc]
}

//formatData(cmudictFile);

//the words are all at lineSplit[0]
//the number of syllables = lineSplit[1].match(/\d+/g).length




function createHaiku(structure) { //structure = [5,7,5]
var words = formatData(text);  
var haikuPoem = [];
  for(var i = 0; i < structure.length; i++){
    var struc = structure[i]
    var randomIndex = Math.floor(Math.random() * words[struc].length - 1)
    //console.log(words[structure[i]][randomIndex])
    //console.log(words[structure[i]].length)
    haikuPoem.push(words[structure[i]][randomIndex]);
  }
  
  console.log(haikuPoem.join("\n"));
}

//createHaiku([5,7,5])
//createHaiku([7,5,7])


module.exports = {
  createHaiku: createHaiku,
};


