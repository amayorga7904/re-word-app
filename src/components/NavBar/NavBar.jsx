import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/api/openAi/history">Prompt History</Link>
      &nbsp; | &nbsp;
      <Link to="/api/openAi">New Prompt</Link>
      &nbsp; | &nbsp;
      <Link to="/api/codes/history">Code History</Link>
      &nbsp; | &nbsp;
      <Link to="/api/codes">New Code</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}