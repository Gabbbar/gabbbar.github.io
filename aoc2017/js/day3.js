(function($,_){
  window.aoc = window.aoc || [];

  var input = `265149`;

  var solveFn1 = function(input) { /* FN1 START */
    let output = 0;

    input = parseInt(input);

    // Get the coordiante of the input number

    // Cumulative number of cells in the memory
    let cells = [1];
    let ring = 0;
    while(input > cells[ring]) {
      ring++;
      cells[ring] = (1 + ring * 2) * 4 - 4 + cells[ring-1];
    }

    let positionOnRing = input - cells[ring-1];
    console.log("cumCellCount", cells, "positionOnRing", positionOnRing)

    // Calculate the four corners of the ring the number is on
    //
    // B-A
    // | |
    // C-D
    //

    let ringSideLength = 1 + ring * 2;

    let valA = cells[ring-1] + ringSideLength - 1;
    let coordA = [ring, ring];

    let valB = valA + ringSideLength - 1;
    let coordB = [-ring, ring];

    let valC = valB + ringSideLength - 1;
    let coordC = [-ring, -ring];

    let valD = valC + ringSideLength - 1;
    let coordD = [ring, -ring];

    let corners = [{value: valA, coord: coordA}, {value: valB, coord: coordB}, {value: valC, coord: coordC}, {value: valD, coord: coordD}];

    let side = _.sortedIndex(corners, {value: input}, "value");
    console.log(corners, "sideIndex", side, "input", input);

    let prevIndex = side - 1;
    let posX;
    let posY;
    if(prevIndex < 0) {
      posX = corners[3].coord[0];
      posY = corners[3].coord[1] + positionOnRing;
    }else{
      posX = Math.sign(corners[side].coord[0] - corners[prevIndex].coord[0]) * (input - corners[prevIndex].value) + corners[prevIndex].coord[0];
      posY = Math.sign(corners[side].coord[1] - corners[prevIndex].coord[1]) * (input - corners[prevIndex].value) + corners[prevIndex].coord[1];
    }
    console.log("position", posX, posY);

    // Calculate the manhattan distance
    output = Math.abs(posX) + Math.abs(posY);
    return output;
  /* FN1 END */ }

  var solveFn2 = function(input) { /* FN2 START */
    let output = 0;

    input = parseInt(input);

    let movements = [{x: 1, y: 0, rem: 1}, {x: 0, y: 1, rem: 1}, {x: -1, y: 0, rem: 2}, {x: 0, y: -1, rem: 2}];
    let memory = [{writeable: false, x: 0, y: 0, value: 1}];

    let field = memory[0];
    for(let i=0; i<1000; i++) {
      
      // Add it to the neighbours if possible
      for(let dx=-1; dx<2; dx++) {
        for(let dy=-1; dy<2; dy++) {
          if(dx === 0 && dy === 0) continue;

          let index = _.findIndex(memory, (value) => {
            return value.x === field.x + dx && value.y === field.y + dy;
          });

          if(index > 0) {
            if(memory[index].writeable === true) {
              memory[index].value += field.value;
            }
          }else{
            memory.push({writeable: true, x: field.x + dx, y: field.y + dy, value: field.value});
          }
        }
      }

      // Movement
      let movement = movements[0];

      let nextX = field.x + movement.x;
      let nextY = field.y + movement.y;

      movement.rem -= 1;
      if(movement.rem === 0) {
        let temp = movements.shift();
        temp.rem = movements[2].rem === movements[1].rem ? movements[1].rem + 1 : movements[2].rem;
        movements.push(temp);
      }

      let index = _.findIndex(memory, (value) => {
        return value.x === nextX && value.y === nextY;
      });

      field.writeable = false;
      field = memory[index];

      //console.log(i, JSON.parse(JSON.stringify(memory)), JSON.parse(JSON.stringify(movements)))

      // Look for solution

      for(let field of memory) {
        if(field.writeable === false) {
          if(field.value > input) return field.value;
        }
      }
    }
    
    return output;
  /* FN2 END */ }

  window.aoc[3] = [input, solveFn1, solveFn2];
}($,_))