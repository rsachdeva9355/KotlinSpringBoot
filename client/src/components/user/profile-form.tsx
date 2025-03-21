import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera } from "lucide-react";

// Form schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  location: z.string().min(1, "Please select your location"),
  bio: z.string().optional(),
  showEmail: z.boolean().optional(),
  showPhone: z.boolean().optional(),
  publicProfile: z.boolean().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(user.profilePicture || "");
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      showEmail: user.showEmail || false,
      showPhone: user.showPhone || false,
      publicProfile: user.publicProfile || true,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("PUT", "/api/user", {
        ...data,
        profilePicture,
      });
      const updatedUser = await res.json();
      queryClient.setQueryData(["/api/user"], updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row">
        {/* User Profile */}
        <div className="md:w-1/3 flex flex-col items-center p-4">
          <div className="w-40 h-40 rounded-full bg-gray-200 mb-4 overflow-hidden relative flex items-center justify-center">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile picture" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-5xl">{user.fullName?.[0]?.toUpperCase() || "U"}</div>
            )}
            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
              <label htmlFor="profile-picture" className="cursor-pointer">
                <Camera size={16} />
                <input 
                  type="file" 
                  id="profile-picture" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleProfilePictureChange} 
                />
              </label>
            </div>
          </div>
          <h2 className="font-poppins text-xl font-semibold mb-1">{user.fullName}</h2>
          <p className="text-gray-600 mb-4">{user.location}</p>
          <div className="flex space-x-2 mb-4">
            <span className="px-3 py-1 bg-secondary-light bg-opacity-20 text-secondary rounded-full text-sm">
              Dog Lover
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Cat Parent
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <div className="md:w-2/3 p-4">
          <h3 className="font-poppins text-lg font-semibold mb-4">Personal Information</h3>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...form.register("fullName")}
                  className="w-full"
                />
                {form.formState.errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  {...form.register("email")}
                  className="w-full"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  {...form.register("phone")}
                  className="w-full"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </Label>
                <Select
                  onValueChange={(value) => form.setValue("location", value)}
                  defaultValue={form.getValues("location")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Amsterdam">Amsterdam, Netherlands</SelectItem>
                    <SelectItem value="Dublin">Dublin, Ireland</SelectItem>
                    <SelectItem value="Calgary">Calgary, Canada</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.location && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </Label>
              <Textarea
                id="bio"
                {...form.register("bio")}
                rows={3}
                className="w-full"
                placeholder="Tell us about yourself and your pets"
              />
            </div>

            <h4 className="font-poppins text-lg font-semibold mb-3">Privacy Settings</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Checkbox
                  id="showEmail"
                  checked={form.watch("showEmail")}
                  onCheckedChange={(checked) => {
                    form.setValue("showEmail", checked === true);
                  }}
                />
                <Label htmlFor="showEmail" className="ml-2 block text-sm text-gray-700">
                  Show my email to other users
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="showPhone"
                  checked={form.watch("showPhone")}
                  onCheckedChange={(checked) => {
                    form.setValue("showPhone", checked === true);
                  }}
                />
                <Label htmlFor="showPhone" className="ml-2 block text-sm text-gray-700">
                  Show my phone number to other users
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="publicProfile"
                  checked={form.watch("publicProfile")}
                  onCheckedChange={(checked) => {
                    form.setValue("publicProfile", checked === true);
                  }}
                />
                <Label htmlFor="publicProfile" className="ml-2 block text-sm text-gray-700">
                  Make my profile visible to everyone
                </Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
