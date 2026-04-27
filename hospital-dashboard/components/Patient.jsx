import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Patients() {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = () => {
    if (!name || !age) return;

    setPatients([...patients, { id: Date.now(), name, age }]);
    setName("");
    setAge("");
    setOpen(false);
  };

  return (
    <section aria-label="Patients Section">
      <h2>Patients</h2>

      <button
        onClick={() => setOpen(true)}
        aria-label="Open Add Patient Form"
      >
        Add Patient
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h3>Add Patient</h3>

        <input
          aria-label="Patient Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          aria-label="Patient Age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={addPatient}>Save</button>
      </Modal>

      <table aria-label="Patients Table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
