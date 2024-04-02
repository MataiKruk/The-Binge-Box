import "./UserProfile.css";
import StickyFooter from "../StickyFooter/StickyFooter";
import UserPlaylistList from "../UserPlaylistList/UserPlaylistList";
import { useUser } from "../../context/AuthContext";
import { Avatar } from "../Avatar/Avatar";

const UserProfile = () => {
  const user = useUser();

  return (
    <div className="user-profile-page-body">
      <div className="user-profile-header">
        <Avatar
          size="xxlarge"
          src={user?.photoURL ?? undefined}
          alt={user?.displayName ?? undefined}
        />
        <h6 className="user-profile-username">
          {user?.displayName ?? user?.email}
        </h6>
      </div>
      <UserPlaylistList></UserPlaylistList>
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default UserProfile;
