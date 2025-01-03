const friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
function findLongestName(arr) {
  let longestName = "";

  arr.forEach(name => {
    if (name.length > longestName.length) {
      longestName = name;
    }
  });

  console.log("Longest name:", longestName);
}
findLongestName(friends);
