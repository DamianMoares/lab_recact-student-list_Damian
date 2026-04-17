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
  
  const [errors, setErrors] = useState({
    fullName: '',
    image: '',
    phone: '',
    email: '',
    program: ''
  });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        return value.length < 2 ? 'Mínimo 2 caracteres' : '';
      case 'image':
        return !value.startsWith('http') ? 'URL inválida' : '';
      case 'phone':
        return !/^\d{3}-\d{3}-\d{4}$/.test(value) ? 'Formato: 123-456-7890' : '';
      case 'email':
        return !value.includes('@') ? 'Email inválido' : '';
      case 'program':
        return !value ? 'Selecciona un programa' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Actualiza el campo correspondiente
    switch (name) {
      case 'fullName': setFullName(value); break;
      case 'image': setImage(value); break;
      case 'phone': setPhone(value); break;
      case 'email': setEmail(value); break;
      case 'program': setProgram(value); break;
    }
    
    // Valida
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validación final
    const finalErrors = {
      fullName: validateField('fullName', fullName),
      image: validateField('image', image),
      phone: validateField('phone', phone),
      email: validateField('email', email),
      program: validateField('program', program)
    };
    setErrors(finalErrors);
    
    if (Object.values(finalErrors).some(error => error)) {
      return;
    }

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

    // Reset form
    setFullName(''); setImage(''); setPhone(''); setEmail(''); setProgram(''); setGraduated(false);
    setErrors({ fullName: '', image: '', phone: '', email: '', program: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Add New Student</h2>
      
      <div className="form-group">
        <label>Full Name:</label>
        <input 
          name="fullName"
          type="text" 
          value={fullName} 
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          required 
          minLength={2}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label>Image URL:</label>
        <input 
          name="image"
          type="url" 
          value={image} 
          onChange={handleChange}
          placeholder="https://..."
          required 
        />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input 
          name="phone"
          type="tel" 
          value={phone} 
          onChange={handleChange}
          placeholder="123-456-7890"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required 
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input 
          name="email"
          type="email" 
          value={email} 
          onChange={handleChange}
          placeholder="ejemplo@dominio.com"
          required 
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Program:</label>
        <select 
          name="program"
          value={program} 
          onChange={handleChange}
          required
        >
          <option value="">-- Please select --</option>
          <option value="Web Dev">Web Dev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data">Data</option>
        </select>
        {errors.program && <span className="error">{errors.program}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input 
            type="checkbox" 
            checked={graduated} 
            onChange={e => setGraduated(e.target.checked)} 
          />
          Graduated
        </label>
      </div>

      <button type="submit" disabled={Object.values(errors).some(e => e)}>
        Add Student
      </button>
    </form>
  );
}

export default AddStudentForm;