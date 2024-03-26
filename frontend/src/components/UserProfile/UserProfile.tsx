import './UserProfile.css';
import StickyFooter from '../StickyFooter/StickyFooter';
import UserPlaylistList from '../UserPlaylistList/UserPlaylistList';

const UserProfile = () => {
    return (
        <div>
        <p>USERPROFILE COMPONENT</p>
        <UserPlaylistList></UserPlaylistList>
        <StickyFooter></StickyFooter>
        </div>
    )
}

export default UserProfile;