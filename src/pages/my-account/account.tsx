import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiPencilLine } from "react-icons/ri";

const MyAccount: React.FC<{
  isNavHovered: boolean;
  setUserName: (name: string) => void;
  userName: string;
}> = ({ isNavHovered, setUserName, userName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [tempName, setTempName] = useState(userName);

  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    setUserName(tempName);
    setIsEditing(false);
  };

  return (
    <div className="w-full px-10">
      {!isEditing ? (
        <>
          <div className="space-y-28 my-10">
            <h4 className="text-3xl">My Account</h4>
          </div>
          <div
            className={`${
              isNavHovered ? "gap-5" : ""
            } w-fit bg-greys-white rounded-lg p-5`}
          >
            <div>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              ) : (
                <CgProfile className="bg-secondary-tan-alt-2 w-32 h-32 rounded-full mx-auto" />
              )}
              <div className="my-12">
                <p
                  className={`font-cabin text-lg ${
                    tempName === "please change your name"
                      ? "text-slate-100"
                      : "text-greys-black"
                  }`}
                >
                  Name: {tempName}
                </p>
                <p className="font-cabin text-lg text-greys-black">
                  Account ID:
                </p>
                <p className="font-cabin text-lg text-greys-black">Email:</p>
                <p className="font-cabin text-lg text-greys-black">Country:</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="border border-secondary-jasper py-2 px-6 text-secondary-jasper rounded-lg"
              >
                Change password
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-secondary-jasper py-2 px-6 text-white rounded-lg"
              >
                Edit profile
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="md:w-fit p-10 md:px-20 bg-secondary-tan-alt-2 md:m-10 mx-auto my-20 rounded-lg">
          <div className="relative w-32 h-32 mx-auto">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <CgProfile className="bg-secondary-tan-alt-2 w-32 h-32 rounded-full" />
            )}
            <div
              className="absolute bottom-0 right-0 p-2 rounded-full bg-white z-10 cursor-pointer"
              onClick={() => {
                document.getElementById("profilePicture")?.click();
              }}
            >
              <RiPencilLine className="text-3xl text-gray-700" />
            </div>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="my-12 space-y-1">
            <p className="font-cabin text-lg text-greys-black">Name:</p>
            <input
              type="text"
              placeholder="name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="p-1 rounded-lg"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={saveChanges}
              className="bg-secondary-jasper py-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
