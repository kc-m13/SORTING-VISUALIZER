// Create an empty array
var array = [];

// Function to generate array
function generateArray() {
  var array_size = $("#element-number").val();
  for (var i = 0; i < array_size; i++) {
    var random_val = Math.floor(Math.random() * array_size) + 1;
    array.push(random_val);
  }
}

// Function to create bars for each element in the array
function createBars() {
  var bars_html = "";
  for (var i = 0; i < array.length; i++) {
    bars_html += '<div class="bar" style="height:' + (array[i] * 20) + 'px;"></div>';
  }
  // Set the bars HTML inside the container element
  $(".array-container").html(bars_html);
}

// Call the generateArray function and create the bars on page load
generateArray();
createBars();

// Call the generateArray and createBars function on clicking the generate array button
$(".generate-array").click(function() {
  array = [];
  generateArray();
  createBars();
});

// Function to perform bubble sort and update the visual representation
async function bubbleSort() {
  var len = array.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      // Highlight the bars being compared
      $(".bar").eq(j).addClass("comparing");
      $(".bar").eq(j + 1).addClass("comparing");

      // Delay the comparison for visualization
      var Speed = $("#sorting-speed").val();
      await new Promise(resolve => setTimeout(resolve, 1000 / Speed));

      // Compare and swap if necessary
      if (array[j] > array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // Update the visual representation after the swap
        createBars();

        // Delay after swapping for visualization
        await new Promise(resolve => setTimeout(resolve, 1000 / Speed));
      }

      // Remove the highlighting
      $(".bar").eq(j).removeClass("comparing");
      $(".bar").eq(j + 1).removeClass("comparing");
    }
  }
}

// Function to merge two sorted arrays with visualization
async function merge(left, right, startIdx) {
  var merged = [];
  var i = 0;
  var j = 0;

  while (i < left.length && j < right.length) {
    // Highlight the bars being merged
    $(".bar").eq(startIdx + i).addClass("merging");
    $(".bar").eq(startIdx + left.length + j).addClass("merging");

    // Delay the merging for visualization
    var Speed = $("#sorting-speed").val();
    await new Promise(resolve => setTimeout(resolve, 1000 / Speed));

    if (left[i] <= right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    merged.push(left[i]);
    i++;
  }

  while (j < right.length) {
    merged.push(right[j]);
    j++;
  }

  // Update the original array with the merged subarray
  for (var k = 0; k < merged.length; k++) {
    array[startIdx + k] = merged[k];
  }

  // Update the visual representation after merging
  createBars();

  // Remove the highlighting
  $(".bar").removeClass("merging");
}

// Function to perform merge sort with visualization
async function mergeSort(arr, startIdx = 0, endIdx = arr.length - 1) {
  if (startIdx >= endIdx) {
    return;
  }

  var mid = Math.floor((startIdx + endIdx) / 2);

  await mergeSort(arr, startIdx, mid);
  await mergeSort(arr, mid + 1, endIdx);

  var left = arr.slice(startIdx, mid + 1);
  var right = arr.slice(mid + 1, endIdx + 1);

  await merge(left, right, startIdx);
}


// Function to perform insertion sort and update the visual representation
async function insertionSort() {
  var len = array.length;
  for (var i = 1; i < len; i++) {
    var key = array[i];
    var j = i - 1;

    // Highlight the bars being compared
    $(".bar").eq(i).addClass("comparing");

    // Delay for visualization
    var Speed = $("#sorting-speed").val();
    await new Promise(resolve => setTimeout(resolve, 1000 / Speed));

    while (j >= 0 && array[j] > key) {
      // Shift elements to the right
      array[j + 1] = array[j];
      j--;

      // Update the visual representation during shifting
      createBars();

      // Delay for visualization
      await new Promise(resolve => setTimeout(resolve, 1000 / Speed));
    }

    // Insert the key at the correct position
    array[j + 1] = key;

    // Update the visual representation after insertion
    createBars();

    // Remove the highlighting
    $(".bar").removeClass("comparing");

    // Delay for visualization
    await new Promise(resolve => setTimeout(resolve, 1000 / Speed));
  }
}

// Call the function on clicking the sort button
$(".reshuffle").click(async function() {
  var SortingTech = $("#sorting-tech").val();

  switch (SortingTech) {
    case "Bubble":
      bubbleSort();
      break;
    case "Merge":
      await mergeSort(array);
      createBars();
      break;
    case "Insertion":
      insertionSort();
      break;
    default:
      alert("Error: Invalid sorting technique selected!");
      break;
  }
});




$(document).ready(function() {
  $('#click-here').click(function() {
    window.location.href = 'index2.html';
  });
});
