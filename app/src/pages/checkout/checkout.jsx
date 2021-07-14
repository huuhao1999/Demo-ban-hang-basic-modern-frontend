
import { useHistory } from "react-router-dom";
import { useAuth } from '../../context/auth.context';
import Checkout from '../../components/checkout/Checkout';
function CheckOut(props) {
    let history = useHistory();
    const { authenticated } = useAuth();
    return (
        <div>
            {authenticated? <Checkout/>: history.push('/signin')}
           
        </div>
    );
}

export default CheckOut;