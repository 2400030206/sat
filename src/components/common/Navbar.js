import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/navbar.css';

const AppNavbar = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear authentication tokens/state
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="app-navbar mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="fw-bold">
          <FontAwesomeIcon icon={faGraduationCap} className="me-2 text-primary" />
          Student Learning Platform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {userRole === 'admin' ? (
              // Admin Navigation Links
              <>
                <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/admin/students">Students</Nav.Link>
                <Nav.Link as={Link} to="/admin/assessments">Assessments</Nav.Link>
                <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              </>
            ) : (
              // Student Navigation Links
              <>
                <Nav.Link as={Link} to="/student/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/student/assessments">My Assessments</Nav.Link>
                <Nav.Link as={Link} to="/student/progress">My Progress</Nav.Link>
                <Nav.Link as={Link} to="/student/feedback">Feedback</Nav.Link>
              </>
            )}
            <Button 
              variant="outline-primary" 
              className="ms-2 logout-btn" 
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;