import React from "react";
import './home.component.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CameraComponent from "../camera/camera.component";
import Logo from "../../images/logo.png"

const studentList = [
    {
        id: "162000388",
        name: "Lê Đăng Việt",
        birthDay: "1-1-2002",
        status: true,
    },
    {
        id: "00002",
        name: "Nguyen Van B",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00003",
        name: "Nguyen Van C",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00004",
        name: "Nguyen Van D",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00005",
        name: "Nguyen Van E",
        birthDay: "1-1-2002",
        status: true,
    },
    {
        id: "00006",
        name: "Nguyen Van F",
        birthDay: "1-1-2002",
        status: true,
    },
    {
        id: "00007",
        name: "Nguyen Van G",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00008",
        name: "Nguyen Van H",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00009",
        name: "Nguyen Van I",
        birthDay: "1-1-2002",
        status: false,
    }, {
        id: "00001",
        name: "Nguyen Van A",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00002",
        name: "Nguyen Van B",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00003",
        name: "Nguyen Van C",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00004",
        name: "Nguyen Van D",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00005",
        name: "Nguyen Van E",
        birthDay: "1-1-2002",
        status: true,
    },
    {
        id: "00006",
        name: "Nguyen Van F",
        birthDay: "1-1-2002",
        status: true,
    },
    {
        id: "00007",
        name: "Nguyen Van G",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00008",
        name: "Nguyen Van H",
        birthDay: "1-1-2002",
        status: false,
    },
    {
        id: "00009",
        name: "Nguyen Van I",
        birthDay: "1-1-2002",
        status: false,
    },
]

export class HomeComponent extends React.Component {

    render() {
        return (
            <div className="root">
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home"><img
                            src={Logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Dai Hoc Cong Nghe Dong Nai"
                        /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Trang chủ</Nav.Link>
                                <Nav.Link href="#link">Điểm danh</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="main-container">
                    <CameraComponent />
                    <div className="list-student-container">
                        <div className="student-list">
                            <table responsive={true} class="table">
                                <thead style={{ position: "sticky", top: "0" }}>
                                    <tr>
                                        <th scope="col">Mssv</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="student-list-body">
                                    {studentList.map((student) => {
                                        return (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.status === false ? <input type="checkbox" /> : <input type="checkbox" checked />}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <a id="link" >imglink</a>
            </div>
        );
    }
}

