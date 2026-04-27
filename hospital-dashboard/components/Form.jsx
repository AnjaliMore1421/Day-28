export default function Form({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    onSubmit({
      email: data.get("email"),
      password: data.get("password")
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
