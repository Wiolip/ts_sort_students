
'use strict';

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

export type SortOrder = 'asc' | 'desc';

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder
): Student[] {
  // Copy array to avoid mutating original
  const studentsCopy = [...students];

  // Safe average grade calculation
  const getAverageGrade = (grades: number[]): number =>
    grades.length ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;

  studentsCopy.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    // Determine the value to compare based on sort type
    if (sortBy === SortType.Name || sortBy === SortType.Surname) {
      aValue = a[sortBy.toLowerCase() as 'name' | 'surname'];
      bValue = b[sortBy.toLowerCase() as 'name' | 'surname'];
    } else if (sortBy === SortType.Age) {
      aValue = a.age;
      bValue = b.age;
    } else if (sortBy === SortType.Married) {
      aValue = a.married ? 1 : 0;
      bValue = b.married ? 1 : 0;
    } else { // AverageGrade
      aValue = getAverageGrade(a.grades);
      bValue = getAverageGrade(b.grades);
    }

    // Generic comparison
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;

    // Maintain original order if equal
    return 0;
  });

  return studentsCopy;
}

