const numbers = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10];
function removeDuplicates(arr) {
  const uniqueNumbers = [...new Set(arr)];
  console.log("Unique numbers:", uniqueNumbers);
}
removeDuplicates(numbers);
