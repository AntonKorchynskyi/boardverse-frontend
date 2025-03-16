import EditProfileForm from "./EditProfileForm";
import getUserProfile from "@/app/(default)/_actions/getUserProfile";

/* 
   this server-side component is separated from client-side "EditProfileForm"
   because this component requires some server-side logic which is not available in client-side 
*/
export default async function EditProfilePage() {
  // This function runs on the server and can safely access cookies.
  const profileData = await getUserProfile();

  return <EditProfileForm initialData={profileData} />;
}
