import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // In a real application, this would be an API call
    // For demo purposes, we'll redirect to login
    navigate('/login');
  };

  return (
    <Container fluid className="auth-container auth-full">
      <Row className="g-0 auth-grid">
        {/* Hero Pane */}
        <Col xs={12} lg={6} className="auth-hero d-flex align-items-center justify-content-center">
          <div className="hero-content text-center px-4 px-lg-5">
            <h1 className="hero-title mb-3">Student Learning Platform</h1>
            <p className="hero-subtitle text-muted mb-4">
              Create your account to begin learning and track progress.
            </p>
            <div className="hero-illustration" aria-hidden="true"></div>
          </div>
        </Col>

        {/* Form Pane */}
        <Col xs={12} lg={6}>
          <Card className="auth-card auth-card-full">
            <Card.Body className="d-flex align-items-center justify-content-center">
              <div className="auth-inner">
                <h4 className="text-center mb-4">Register</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Register As</Form.Label>
                    <Form.Select 
                      name="role" 
                      value={role} 
                      onChange={onChange}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Teacher (Admin)</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Register
                  </Button>
                  <div className="text-center mt-3">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;