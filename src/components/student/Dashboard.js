import React from "react";
import { Container, Row, Col, Card, ProgressBar, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheckCircle,
  faExclamationTriangle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import AppNavbar from "../common/Navbar";
import "../../assets/css/dashboard.css";

const studentData = {
  name: "Sarath",
  id: "2400031328",
  overallProgress: 72,
  completedAssessments: 18,
  pendingAssessments: 3,
  subjects: [
    { name: "Mathematics", progress: 95, grade: "A" },
    { name: "Operating System", progress: 82, grade: "A-" },
    { name: "Japanese", progress: 78, grade: "B+" },
    { name: "Computer Science", progress: 90, grade: "A" },
  ],
  recentFeedback: [
    {
      id: 1,
      subject: "Mathematics",
      message: "Need to improve on algebraic equations.",
      date: "2023-10-12",
    },
    {
      id: 2,
      subject: "Science",
      message: "Excellent work on the biology project!",
      date: "2025-10-08",
    },
  ],
  upcomingAssessments: [
    {
      id: 1,
      title: "Final Exam",
      subject: "Mathematics",
      dueDate: "2025-11-15",
      importance: "high",
    },
    {
      id: 2,
      title: "Lab Report",
      subject: "Science",
      dueDate: "2025-10-25",
      importance: "medium",
    },
    {
      id: 3,
      title: "Essay Submission",
      subject: "English",
      dueDate: "2025-10-20",
      importance: "medium",
    },
  ],
};

const StudentDashboard = () => {
  return (
    <>
      <AppNavbar userRole="student" />

      <div className="dashboard-banner">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <p className="dashboard-subtitle">Track your performance in real time</p>
      </div>

      <Container className="dashboard-container">
        <div className="welcome-card">
          <h4>
            Welcome, <span className="student-name">{studentData.name}</span>
            <span className="text-muted ms-2">({studentData.id})</span>
          </h4>
        </div>

        {/* Stats */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <div className="stat-icon bg-primary">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h6>Overall Progress</h6>
                <h2>{studentData.overallProgress}%</h2>
                <ProgressBar
                  now={studentData.overallProgress}
                  variant="success"
                  className="progress-custom"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <div className="stat-icon bg-success">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h6>Completed</h6>
                <h2>{studentData.completedAssessments}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <div className="stat-icon bg-warning">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
                <h6>Pending</h6>
                <h2>{studentData.pendingAssessments}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <div className="stat-icon bg-info">
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <h6>Total Subjects</h6>
                <h2>{studentData.subjects.length}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Subject Section */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="content-card shadow-sm">
              <Card.Header>
                <h5>Subject Progress</h5>
              </Card.Header>
              <Card.Body>
                {studentData.subjects.map((subject, i) => (
                  <div className="subject-row" key={i}>
                    <div className="d-flex justify-content-between">
                      <strong>{subject.name}</strong>
                      <span>
                        <Badge bg="success" className="me-2">
                          {subject.grade}
                        </Badge>
                        {subject.progress}%
                      </span>
                    </div>
                    <ProgressBar
                      now={subject.progress}
                      variant="info"
                      className="progress-custom"
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Feedback */}
          <Col md={4}>
            <Card className="content-card shadow-sm">
              <Card.Header>
                <h5>Recent Feedback</h5>
              </Card.Header>
              <Card.Body>
                {studentData.recentFeedback.map((item) => (
                  <div className="feedback-box" key={item.id}>
                    <h6>{item.subject}</h6>
                    <p>{item.message}</p>
                    <small className="text-muted">{item.date}</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Assessments */}
        <Card className="content-card shadow-sm">
          <Card.Header>
            <h5>Upcoming Assessments</h5>
          </Card.Header>
          <Card.Body>
            <table className="table table-hover modern-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {studentData.upcomingAssessments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.subject}</td>
                    <td>{a.dueDate}</td>
                    <td>
                      <Badge
                        bg={
                          a.importance === "high"
                            ? "danger"
                            : a.importance === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {a.importance}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentDashboard;
