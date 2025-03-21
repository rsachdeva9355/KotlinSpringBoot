import { CustomTabs } from "@/components/ui/tabs";
import ProfileForm from "@/components/user/profile-form";
import PetProfilesPage from "./pet-profiles-page";
import ServicesPage from "./services-page";
import InfoHubPage from "./info-hub-page";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      content: <ProfileForm user={user} />
    },
    {
      id: "pets",
      label: "My Pets",
      content: <PetProfilesPage />
    },
    {
      id: "services",
      label: "Find Services",
      content: <ServicesPage />
    },
    {
      id: "info",
      label: "Pet Info",
      content: <InfoHubPage />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomTabs tabs={tabs} defaultTab="profile" />
    </div>
  );
}
