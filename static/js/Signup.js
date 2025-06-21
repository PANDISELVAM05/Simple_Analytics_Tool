async function handleSignup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = "/Signin.html"; // Redirect to login page
    } else {
      alert(data.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    alert("Error connecting to the server. Please try again later.");
  }
}
