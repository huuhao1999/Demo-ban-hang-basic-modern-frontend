import Profile from '../../components/Profile/profile';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../context/auth.context';
function ProfileUser(props) {
    let history = useHistory();
    const { authenticated } = useAuth();
    return (
        <div>
            {authenticated? <Profile/>: <Profile/>}
        </div>
    );
}
export default ProfileUser;
 