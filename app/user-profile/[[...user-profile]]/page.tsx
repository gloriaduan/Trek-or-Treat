import { UserProfile } from "@clerk/nextjs";

function UserProfilePage() {
  return (
    <div className="dark-bg flex-1 flex items-center justify-center p-5">
      <UserProfile path="/user-profile" />
    </div>
  );
}

export default UserProfilePage;
