import { useEffect } from "react";
import gsap from "gsap";

export default function Dashboard() {
  useEffect(() => {
    // SET final state first (IMPORTANT FIX)
    gsap.set(".card", { opacity: 1, y: 0 });

    // Then animate
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15
      }
    );
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>

      <div className="grid">
        <div className="card">👨‍⚕️ Total Doctors: 52</div>
        <div className="card">🧑 Total Patients: 1200</div>
        <div className="card">🛏 Beds Available: 300</div>
        <div className="card">🚑 Emergency: Active</div>
      </div>
    </div>
  );
}
