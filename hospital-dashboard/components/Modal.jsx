import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const ref = useRef();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      ref.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div
        className="modal"
        ref={ref}
        tabIndex="-1"
        aria-label="Add Patient Modal"
      >
        {children}
        <button onClick={onClose} aria-label="Close Modal">
          Close
        </button>
      </div>
    </div>
  );
}
