import { UserProfile } from "@clerk/nextjs";

function UserProfilePage() {
  return <UserProfile path="/user-profile" />;
}

export default UserProfilePage;
