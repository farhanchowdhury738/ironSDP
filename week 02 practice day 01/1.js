
function getGrade(score) {
    if (score >= 90) {
        return 'A+';
    } else if (score >= 80) {
        return 'A';
    } else if (score >= 70) {
        return 'B';
    } else if (score >= 60) {
        return 'D+';
    } else if (score >= 50) {
        return 'D';
    } else {
        return 'F';
    }
}


const scores = [95, 85, 75, 65, 55, 45];
scores.forEach(score => {
    console.log(`Score: ${score}, Grade: ${getGrade(score)}`);
});
