import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../common/Navbar';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    grade: '',
    parentEmail: '',
    parentPhone: ''
  });
  
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Here you would typically send the data to your backend API
    console.log('Student data submitted:', formData);
    setSubmitting(true);

    // Fake request delay to show spinner and success
    setTimeout(() => {
      setShowSuccess(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        grade: '',
        parentEmail: '',
        parentPhone: ''
      });
      setValidated(false);
      setSubmitting(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin/students');
      }, 1200);
    }, 700);
  };
  
  return (
    <>
      <AppNavbar userRole="admin" />
      <Container className="py-4 auth-container">
        <Card className="auth-card dashboard-card">
          <Card.Header className="bg-primary text-white">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                <div>
                  <h5 className="mb-0">Add New Student</h5>
                  <small className="text-white-50">Create student account and link parent details</small>
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            {showSuccess && (
              <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                Student added successfully! Redirecting to student list...
              </Alert>
            )}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={3} className="d-flex flex-column align-items-center justify-content-center">
                  <div style={{width:96,height:96,borderRadius:12,background:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'#6b21a8'}}>
                    { (formData.firstName || formData.lastName) ? 
                      `${(formData.firstName || '').charAt(0).toUpperCase()}${(formData.lastName || '').charAt(0).toUpperCase()}` : 'ST' }
                  </div>
                  <small className="text-muted mt-2">Student avatar</small>
                </Col>

                <Col md={9}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <FormControl type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required minLength="6" />
                          <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Grade</Form.Label>
                        <Form.Select name="grade" value={formData.grade} onChange={handleChange} required>
                          <option value="">Select Grade</option>
                          <option value="6">6th Grade</option>
                          <option value="7">7th Grade</option>
                          <option value="8">8th Grade</option>
                          <option value="9">9th Grade</option>
                          <option value="10">10th Grade</option>
                          <option value="11">11th Grade</option>
                          <option value="12">12th Grade</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a grade.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Parent Email</Form.Label>
                        <Form.Control type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please provide a valid parent email.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Parent Phone</Form.Label>
                        <Form.Control type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required pattern="[0-9]{10}" />
                        <Form.Text className="text-muted">Format: 10 digits without spaces or dashes</Form.Text>
                        <Form.Control.Feedback type="invalid">Please provide a valid 10-digit phone number.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" as={Link} to="/admin/students">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back to Students
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting && <Spinner animation="border" size="sm" className="me-2" />}
                  Add Student
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddStudent;