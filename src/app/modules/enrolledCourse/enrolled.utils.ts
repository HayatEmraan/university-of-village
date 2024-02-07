export const calculateGradePoints = (totalMarks: number) => {
  let gradePoints = {
    grade: 'N/A',
    gradePoints: 0,
  }

  if (totalMarks >= 0 && totalMarks <= 19) {
    gradePoints = {
      grade: 'F',
      gradePoints: 0.0,
    }
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    gradePoints = {
      grade: 'E',
      gradePoints: 1.0,
    }
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    gradePoints = {
      grade: 'C',
      gradePoints: 3.0,
    }
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    gradePoints = {
      grade: 'B',
      gradePoints: 3.5,
    }
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    gradePoints = {
      grade: 'A',
      gradePoints: 4.0,
    }
  } else {
    gradePoints = {
      grade: 'NA',
      gradePoints: 0,
    }
  }

  return gradePoints
}
