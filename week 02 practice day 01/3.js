function arrangeOddEven() {
    const oddNumbers = [];
    const evenNumbers = [];
    
    for (let i = 1; i <= 20; i++) {
      if (i % 2 === 0) {
        evenNumbers.push(i);
      } else {
        oddNumbers.push(i);
      }
    }
  
    console.log("Odd Numbers:", oddNumbers);
    console.log("Even Numbers:", evenNumbers);
  }
  arrangeOddEven();
  