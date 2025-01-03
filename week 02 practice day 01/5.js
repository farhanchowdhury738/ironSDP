function divisibleBy3And5() {
    const div3 = [];
    const div5 = [];
  
    for (let i = 1; i <= 50; i++) {
      if (i % 3 === 0) div3.push(i);
      if (i % 5 === 0) div5.push(i);
    }
  
    console.log("Divisible by 3:", div3);
    console.log("Divisible by 5:", div5);
  }
  divisibleBy3And5();
  