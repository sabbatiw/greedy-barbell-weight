// config
const barWeight = 45;
const denominations = [45, 35, 25, 10, 5, 2.5]; // descending order is required
const low = 2.5;
const max = 1100

// cache dom elements
const barSpan = document.getElementById('bar');
const outputDiv = document.getElementById('weight_list');
const totalSpan = document.getElementById('total');
const weightInput = document.getElementById('weight_input');

// display bar weight
barSpan.innerHTML = barWeight;

// rounds weight to nearest multiple of 2 * low
const roundWeight = weight => {
  let divisor = 2 * low;
  let remainder = weight % divisor;

  // round up
  if (remainder >= low) {
    return weight - remainder + divisor;
  }
  // round down
  return weight - remainder;
}

// implements greedy algorithm to determine number and denomination of weights
// necessary that sums (with bar weight) to (rounded) user provided weight.
const gbw = () => {
  // user provided input
  const inputWeight = weightInput.value;
 
  // enforce max input weight 
  if (inputWeight > max) {
    inputWeight = max;
  }
 
  // running total of weight to lift (including bar)
  let totalWeightWithBar = barWeight;

  // ignore the bar prior to rounding
  let currentWeight = inputWeight - barWeight;
  
  // response string
  let output;
  
  // nothing to calculate
  if (currentWeight < low) {
    output = "just use the bar";
    outputDiv.innerHTML = output;
    totalSpan.innerHTML = barWeight + " pounds";
    return;
  }

  // round to appropriate weight and focus on a single side of the barbell
  currentWeight = roundWeight(currentWeight);
  currentWeight /= 2;

  // results are an html unordered list
  output = "On each side use:<ul>";

  // greedy algorithm
  for (let d of denominations) {
    
    // track number of each denomination needed
    let count = 0;
    
    while (true) {
      // new weight to test
      let newWeight = currentWeight - d;
      
      // done with current denomination
      if (newWeight < 0) {
        break;
      }

      totalWeightWithBar += 2 * d; // one on each side of barbell
      count++;
      currentWeight = newWeight;
    }

    // add item to list only if we used a denomination
    if (count) {
      output += "<li>" + count + " x " + d + "</li>";
    }
  }

  // close the html list
  output += "</ul>";
  
  // display results
  outputDiv.innerHTML = output;
  totalSpan.innerHTML = totalWeightWithBar + " pounds";
}
