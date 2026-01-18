
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = "Name",
  Surname = "Surname",
  Age = "Age",
  Married = "Married",
  AverageGrade = "AverageGrade"
}

// create SortOrder type
export type SortOrder = 'asc' | 'desc';


export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder
): Student[] {
  // Copy array to avoid mutating original
  const studentsCopy = [...students];

  // Helper to calculate average grade
  const getAverageGrade = (grades: number[]): number =>
    grades.reduce((sum, g) => sum + g, 0) / grades.length;

  studentsCopy.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case SortType.Name:
        aValue = a.name;
        bValue = b.name;
        break;
      case SortType.Surname:
        aValue = a.surname;
        bValue = b.surname;
        break;
      case SortType.Age:
        aValue = a.age;
        bValue = b.age;
        break;
      case SortType.Married:
        aValue = a.married ? 1 : 0;
        bValue = b.married ? 1 : 0;
        break;
      case SortType.AverageGrade:
        aValue = getAverageGrade(a.grades);
        bValue = getAverageGrade(b.grades);
        break;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;

    // Maintain original order if equal
    return 0;
  });

  return studentsCopy;
}
