import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'

function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">E-Com</Navbar.Brand>
          <Nav className="mr-auto navbar_wrapper">
            {
         
            user != undefined || user != null?
            
              <>
              <Link to="/list">Product List</Link>
              <Link to="/add">Add Product</Link>
            
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
            
          </Nav>
         
        </Container>
        {user?
        <Nav>
            <NavDropdown title={user && user.email}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        :null
          }
      </Navbar>
    </div>
  )
}
export default Header
