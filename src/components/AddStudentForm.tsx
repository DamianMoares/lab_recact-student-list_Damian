import { useState } from 'react';
import type { Student } from '../App';

type Props = {
  onAddStudent: (student: Student) => void;
};

function AddStudentForm({ onAddStudent }: Props) {
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [graduated, setGraduated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newStudent: Student = {
      _id: crypto.randomUUID(),
      fullName,
      image,
      phone,
      email,
      program,
      graduated
    };

    onAddStudent(newStudent);

    setFullName('');
    setImage('');
    setPhone('');
    setEmail('');
    setProgram('');
    setGraduated(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <div>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
      </div>

      <div>
        <label>Image URL:</label>
        <input type="url" value={image} onChange={e => setImage(e.target.value)} />
      </div>

      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Program:</label>
        <select value={program} onChange={e => setProgram(e.target.value)}>
          <option value="">-- Please select --</option>
          <option value="Web Dev">Web Dev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data">Data</option>
        </select>
      </div>

      <div>
        <label>Graduated:</label>
        <input
          type="checkbox"
          checked={graduated}
          onChange={e => setGraduated(e.target.checked)}
        />
      </div>

      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;