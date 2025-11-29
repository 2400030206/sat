import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // CAPTCHA state
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");

  const { email, password, role } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // EMPTY FIELDS CHECK
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // CAPTCHA validation (simple client-side math)
    const parsed = parseInt((captchaInput || "").toString().trim(), 10);
    if (!Number.isInteger(parsed) || parsed !== captchaAnswer) {
      setError("CAPTCHA incorrect. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    // SAMPLE VALID CREDS
    const validStudent = {
      email: "student@klu.com",
      password: "student123",
    };

    const validAdmin = {
      email: "admin@klu.com",
      password: "admin123",
    };

    // CHECK ROLE LOGIN
    if (role === "student") {
      if (email === validStudent.email && password === validStudent.password) {
        navigate("/student/dashboard");
      } else {
        setError("Invalid Email or Password");
      }
    }

    if (role === "admin") {
      if (email === validAdmin.email && password === validAdmin.password) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid Email or Password");
      }
    }
  };

  // generate a simple addition captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptchaQuestion(`${a} + ${b} = ?`);
    setCaptchaAnswer(a + b);
  };

  useEffect(() => {
    generateCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>
         <h3>Student Learning Outcomes</h3>
        <p className="text-center mb-4" style={{ opacity: 0.8 }}>
          Login to continue your learning.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={handleChange}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleChange}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Login As</Form.Label>
            <Form.Select
              name="role"
              value={role}
              onChange={handleChange}
              style={{
                background: "rgba(52, 12, 62, 0.2)",
                border: "none",
                color: "white",
              }}
            >
              <option value="student">Student</option>
              <option value="admin">Teacher (Admin)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CAPTCHA: <small style={{opacity:0.9}}>{captchaQuestion}</small></Form.Label>
            <div style={{display: 'flex', gap: '8px'}}>
              <Form.Control
                type="text"
                placeholder="Enter CAPTCHA result"
                value={captchaInput}
                onChange={handleCaptchaChange}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                }}
              />
              <Button
                variant="light"
                onClick={() => { generateCaptcha(); setCaptchaInput(""); setError(""); }}
                style={{ minWidth: '44px', padding: '0 10px' }}
                title="Refresh CAPTCHA"
              >
                ↻
              </Button>
            </div>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-2"
            style={{
              padding: "12px",
              background:
                "linear-gradient(135deg, rgba(70, 30, 30, 0.5), rgba(111, 7, 7, 0.3))",
              color: "#000",
              fontWeight: "700",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            Login
          </Button>

          <div className="text-center mt-3">
            <p style={{ color: "white", opacity: 0.7 }}>
              Don’t have an account?{" "}
              <Link to="/register" style={{ color: "#fff", fontWeight: "600" }}>
                Register
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
