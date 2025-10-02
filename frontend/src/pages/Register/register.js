import './Register.css';

function Register() {
  return (
    <div class="register">
        <h2>Register</h2>
        <form action="/api/register" method="POST">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required />

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Register</button>
        </form>
    </div>
  );
}

export default Register;
