import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';

const Students = () => {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: 'Sathwik', email: 'Sathwik@example.com', grade: '10th', enrollmentDate: '2023-01-15', status: 'Active' },
    { id: 2, name: 'Ravi', email: 'Ravi@example.com', grade: '11th', enrollmentDate: '2022-09-05', status: 'Active' },
    { id: 3, name: 'Gowtham', email: 'Gowtham.b@example.com', grade: '9th', enrollmentDate: '2023-02-10', status: 'Active' },
    { id: 4, name: 'deva', email: 'deva@example.com', grade: '12th', enrollmentDate: '2021-08-20', status: 'Inactive' },
    { id: 5, name: 'David', email: 'david@example.com', grade: '10th', enrollmentDate: '2023-01-30', status: 'Active' },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: null,
    name: '',
    email: '',
    grade: '',
    enrollmentDate: '',
    status: 'Active'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle modal open for new student
  const handleAddNew = () => {
    setCurrentStudent({
      id: null,
      name: '',
      email: '',
      grade: '',
      enrollmentDate: '',
      status: 'Active'
    });
    setIsEditing(false);
    setShowModal(true);
  };

  // Handle modal open for editing
  const handleEdit = (student) => {
    setCurrentStudent({ ...student });
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({
      ...currentStudent,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (isEditing) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === currentStudent.id ? currentStudent : student
      ));
    } else {
      // Add new student
      const newStudent = {
        ...currentStudent,
        id: students.length + 1
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
  };

  // Handle student deletion
  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">Student Management</h2>
            <p className="text-muted">Manage student records and enrollment</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={handleAddNew}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add New Student
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <h5 className="card-title">Total Students</h5>
                <h2 className="card-value">{students.length}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <h5 className="card-title">Active Students</h5>
                <h2 className="card-value text-success">
                  {students.filter(student => student.status === 'Active').length}
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <h5 className="card-title">Inactive Students</h5>
                <h2 className="card-value text-danger">
                  {students.filter(student => student.status === 'Inactive').length}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mb-4">
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Grade</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.grade}</td>
                    <td>{student.enrollmentDate}</td>
                    <td>
                      <span className={`badge ${student.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(student)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleDelete(student.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button variant="outline-info" size="sm">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for adding/editing students */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Student' : 'Add New Student'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                value={currentStudent.name} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={currentStudent.email} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Select 
                name="grade"
                value={currentStudent.grade} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Grade</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enrollment Date</Form.Label>
              <Form.Control 
                type="date" 
                name="enrollmentDate"
                value={currentStudent.enrollmentDate} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                name="status"
                value={currentStudent.status} 
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Students;