function calculateMonthlySavings(payments, livingCost) {
    if (!Array.isArray(payments) || typeof livingCost !== 'number') {
        return "invalid input";
    }

    if (!payments.every(payment => typeof payment === 'number')) {
        return "invalid input";
    }

    const totalPayment = payments.reduce((sum, payment) => sum + payment, 0);
    const taxAmount = payments
        .filter(payment => payment >= 3000)
        .reduce((tax, payment) => tax + (payment * 0.2), 0);

    const totalExpenses = livingCost + taxAmount;
    const savings = totalPayment - totalExpenses;

    if (savings === 0) {
        return 0;
    }
    
    if (savings <= 0) {
        return "earn more";
    }

    return Math.floor(savings);
}

// Test cases
console.log(calculateMonthlySavings([1000, 2000, 3000], 5400));  // 0
console.log(calculateMonthlySavings([1000, 2000, 2500], 5000));  // 500
console.log(calculateMonthlySavings([900, 2700, 3400], 10000));  // "earn more"
console.log(calculateMonthlySavings([100, 900, 2700, 3400], "invalid")); // "invalid input"