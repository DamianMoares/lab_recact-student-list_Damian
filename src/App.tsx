import { useState } from 'react';
import './App.css';
import { studentsData } from './students';
import AddStudentForm from './components/AddStudentForm';

export type Student = {
  _id: string;
  fullName: string;
  image: string;
  phone: string;
  email: string;
  program: string;
  graduated: boolean;
};

function App() {
  const [students, setStudents] = useState<Student[]>(studentsData);

  const addStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="App">
      <AddStudentForm onAddStudent={addStudent} />
      
      <h1>Student List</h1>
      <div className="student-list">
        {students.map(student => (
          <div key={student._id} className="student-card">
            <img src={student.image} alt={student.fullName} />
            <h3>{student.fullName}</h3>
            <p>Program: {student.program}</p>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
            <p>Graduated: {student.graduated ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;