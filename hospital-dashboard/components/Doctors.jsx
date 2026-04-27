export default function Doctors() {
  const doctors = [
    { name: "Dr. Sharma", dept: "Cardiology" },
    { name: "Dr. Mehta", dept: "Neurology" },
    { name: "Dr. Patel", dept: "Orthopedics" },
    { name: "Dr. Rao", dept: "General" }
  ];

  return (
    <div>
      <h2>Doctors List</h2>

      <div className="grid">
        {doctors.map((doc, i) => (
          <div className="card" key={i}>
            <h3>{doc.name}</h3>
            <p>{doc.dept}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
