export default function Sidebar({ page, setPage }) {
  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "patients", label: "Patients" },
    { id: "doctors", label: "Doctors" }
  ];

  return (
    <nav className="sidebar">
      <h2>🏥 MediCare</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item.id}
            className={page === item.id ? "active" : ""}
            onClick={() => setPage(item.id)}
            tabIndex="0"
            role="button"
            onKeyDown={(e) => e.key === "Enter" && setPage(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
