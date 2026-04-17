# lab_recap-react-state-and-events

![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | React Student List Manager

## Learning Goals

After this exercise, you will be able to:

- Create controlled components in React to manage form inputs.
- Handle form submissions to capture user data.
- Update state immutably by adding new items to an array.
- "Lift state up" to a common parent component.
- Pass functions as props from a parent to a child component to enable child-to-parent communication.

<br>
 

## Requirements

- You will be creating a new React project from scratch for this lab.
- No repository is provided. You will be creating your own.
- You need [Node.js](https://nodejs.org/en/) installed on your machine.

<br>

## Submission

- Upon completion, create a new repository on GitHub.
- Add your local project to the remote repository.
- Run the following commands:

```shell
$ git add .
$ git commit -m "Solved lab"
$ git push origin main
```

- Share the repository link with your TAs.

<br>

## Test Your Code

For this lab, you will test your code by running the application and observing its behavior in the browser. There are no pre-written unit tests.

To run your React application, run the following command from the root of the project:

```shell
$ npm run dev
```

To see the outputs of `console.log` in your JavaScript code, open the [Console in the Developer Tools](https://developer.chrome.com/docs/devtools/open/#console) of your browser.

<br>

## Instructions

Building on our last lesson where we fetched and displayed data, we'll now focus on adding new data to our application. You will build a simple student management dashboard. The dashboard will display a list of students and include a form to add new students to the list.

This exercise is split into multiple iterations:

- **Setup**: You will create a new React project and set up the initial student list.
- **Controlled Form**: You will build a form component with controlled inputs.
- **Lifting State Up**: You will implement the logic to add a new student from the form to the main list in the parent component.

<br>

### Iteration 0 - Project Setup

Let's get our project ready.

1.  **Create the project.**
    In your terminal, create a new React project using Vite. Name it `lab-react-student-list`.

    ```shell
    $ npm create vite@latest lab-react-student-list -- --template react-ts
    ```

2.  **Navigate and install.**

    ```shell
    $ cd lab-react-student-list
    $ npm install
    ```

3.  **Clean up the project.**

    - Delete everything inside `src/App.css`.
    - Replace the content of `src/App.tsx` with a basic functional component.

4.  **Create initial data.**

    - Create a new file `src/students.ts`.
    - Add the following array of student data to this file. We'll use this to populate our initial list.

    ```ts
    // src/students.ts
    export const studentsData = [
      {
        _id: '1a',
        fullName: 'Anna Smith',
        image: 'https://randomuser.me/api/portraits/women/85.jpg',
        phone: '123-456-7890',
        email: 'anna.smith@example.com',
        program: 'Web Dev',
        graduated: true
      },
      {
        _id: '2b',
        fullName: 'Ben Carter',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        phone: '234-567-8901',
        email: 'ben.carter@example.com',
        program: 'UX/UI',
        graduated: false
      }
    ];
    ```

<br>

### Iteration 1 - Display Initial Students

First, let's display the initial list of students.

1.  **Define the Student type.**
    It's a good practice to define the shape of our data. At the top of `src/App.tsx`, create a `Student` type.

2.  **Import and manage state.**

    - In `App.tsx`, import `useState` from React and the `studentsData` from `./students.ts`.
    - Create a state variable called `students` and initialize it with `studentsData`.

3.  **Render the list.**
    - Map over the `students` state array.
    - For each student, render their image, full name, program, email, and phone number.
    - Remember to use the student's `_id` as the `key` for each list item.
    - Add some basic CSS in `App.css` to style the list and student cards.

<details>
  <summary>Click for Solution</summary>

**`src/App.jsx`**

```jsx
import { useState } from 'react';
import './App.css';
import { studentsData } from './students';

function App() {
  const [students, setStudents] = useState(studentsData);

  return (
    <div className="App">
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
```

**`src/App.css`**

```css
.student-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.student-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 250px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.student-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
```

</details>

<br>

### Iteration 2 - Create a Controlled Form Component

Now, let's build the form for adding new students. We'll create a separate component for this.

1.  **Create the `AddStudentForm` component.**

    - Create a new folder `src/components`.
    - Inside it, create a new file `AddStudentForm.jsx`.
    - In this file, create a functional component that returns a `<form>`.

2.  **Build the form structure.**
    The form should have `input` fields for:

    - Full Name (`text`)
    - Image URL (`url`)
    - Phone (`tel`)
    - Email (`email`)
    - A `select` dropdown for the Program (with options like "Web Dev", "UX/UI", "Data").
    - A `checkbox` for "Graduated".
    - A `button` of type `submit`.

3.  **Create state for each input.**

    - Inside `AddStudentForm`, use `useState` to create a separate state variable for each form field (`fullName`, `image`, `phone`, `email`, `program`, `graduated`).

4.  **Make the form controlled.**
    - For each input, connect it to its corresponding state variable.
    - The `value` of the input should be the state variable.
    - The `onChange` event handler should update the state variable. For the checkbox, you'll use `event.target.checked`.

> [!TIP]
> This pattern is called a **controlled component**. React state is the "single source of truth" for the form's data. This makes it easy to read, validate, and manage form data.

<details>
  <summary>Click for Solution</summary>

**`src/components/AddStudentForm.jsx`**

```jsx
import { useState } from 'react';

function AddStudentForm() {
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [graduated, setGraduated] = useState(false);

  return (
    <form>
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
        <input type="checkbox" checked={graduated} onChange={e => setGraduated(e.target.checked)} />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
```

</details>

<br>

### Iteration 3 - Handle Submission & Lift State Up

The form is ready, but it doesn't do anything yet. The `AddStudentForm` component has the form data, but the `App` component owns the list of students. We need to get the data from the child (`AddStudentForm`) to the parent (`App`). This is a classic React pattern called "Lifting State Up".

1.  **Create an `addStudent` function in `App.jsx`.**

    - This function will accept one argument: a new student object.
    - Inside the function, use the `setStudents` state setter to update the list. Create a _new_ array containing all the old students plus the new one.

    > [!CAUTION]
    > Never mutate state directly (e.g., `students.push(newStudent)`). Always create a new array: `setStudents([...students, newStudent])`. This is crucial for React to detect changes and re-render correctly.

2.  **Pass the function as a prop.**

    - Render the `<AddStudentForm />` component inside `App.jsx`.
    - Pass the `addStudent` function you just created as a prop to the form component. You can name the prop `onAddStudent`.

3.  **Handle the form submission in `AddStudentForm.jsx`.**
    - Accept the `onAddStudent` function from the props.
    - Create a `handleSubmit` function that will be called when the form is submitted.
    - In `handleSubmit`:
      - Call `event.preventDefault()` to stop the page from reloading.
      - Create a `newStudent` object using the data from your form's state variables.
      - Generate a unique ID for the new student. You can use `crypto.randomUUID()`.
      - Call the `onAddStudent` prop function, passing the `newStudent` object as the argument.
      - Reset all the form state variables to clear the input fields for the next entry.

<details>
  <summary>Click for Solution</summary>

**`src/App.jsx` (updated)**

```jsx
import { useState } from 'react';
import './App.css';
import { studentsData } from './students';
import AddStudentForm from './components/AddStudentForm'; // Import the form

function App() {
  const [students, setStudents] = useState(studentsData);

  // Function to add a new student
  const addStudent = newStudent => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="App">
      {/* Pass the function as a prop */}
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
```

**`src/components/AddStudentForm.jsx` (updated)**

```jsx
import { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [graduated, setGraduated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault(); // Prevent page reload

    const newStudent = {
      _id: crypto.randomUUID(), // Generate unique ID
      fullName,
      image,
      phone,
      email,
      program,
      graduated
    };

    onAddStudent(newStudent); // Call the function from props

    // Reset form fields
    setFullName('');
    setImage('');
    setPhone('');
    setEmail('');
    setProgram('');
    setGraduated(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form inputs remain the same ... */}
      <h2>Add New Student</h2>
      <div>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="url" value={image} onChange={e => setImage(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Program:</label>
        <select value={program} onChange={e => setProgram(e.target.value)} required>
          <option value="">-- Please select --</option>
          <option value="Web Dev">Web Dev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data">Data</option>
        </select>
      </div>
      <div>
        <label>Graduated:</label>
        <input type="checkbox" checked={graduated} onChange={e => setGraduated(e.target.checked)} />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
```

</details>

<br>

**Happy coding!** :heart:
//Vamos a empezar 