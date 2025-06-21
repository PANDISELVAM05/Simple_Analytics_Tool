async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("token", data.token);
      window.location.href = "/Home.html"; // Replace with your homepage
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Failed to connect to server.");
  }
}
