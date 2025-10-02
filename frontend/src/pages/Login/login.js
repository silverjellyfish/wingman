import './login.css';

function Login() {
    // function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Logging in with:", { email, password });
    //     // here you can call your backend API
    // };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form
        // onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <label>Email</label>
        <input
          type="email"
        //   value={email}
        //   onChansge={(e) => setEmail(e.target.value)}
          required
        />

        <label style={{ marginTop: "10px" }}>Password</label>
        <input
          type="password"
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
