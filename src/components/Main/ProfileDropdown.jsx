import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import usersData from "../../data/users.json";
import RateAppModal from "./RateAppModal";
import ProfilePictureModal from "./ProfilePictureModal";
import ProfileEditModal from "./ProfileEditModal";
import GiveIdeasModal from "./GiveIdeasModal";

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isRateAppModalOpen, setRateAppModalOpen] = useState(false);
  const [isProfilePictureModalOpen, setProfilePictureModalOpen] =
    useState(false);
  const [isProfileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const [isGiveIdeasModalOpen, setGiveIdeasModalOpen] = useState(false);
  const [users, setUsers] = useState(usersData);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const user = users.find((user) => user.id === parseInt(token));
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
        setUserAvatar(
          user.profile_picture ||
            "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        );
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [users]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleRateApp = () => {
    setRateAppModalOpen(true);
  };

  const handleCloseRateAppModal = () => {
    setRateAppModalOpen(false);
  };

  const handleUpdateProfilePicture = () => {
    setProfilePictureModalOpen(true);
  };

  const handleCloseProfilePictureModal = () => {
    setProfilePictureModalOpen(false);
  };

  const handleEditProfile = () => {
    setProfileEditModalOpen(true);
  };

  const handleCloseProfileEditModal = () => {
    setProfileEditModalOpen(false);
  };

  const handleGiveIdeas = () => {
    setGiveIdeasModalOpen(true);
  };

  const handleCloseGiveIdeasModal = () => {
    setGiveIdeasModalOpen(false);
  };

  const handleProfileUpdated = (updatedData) => {
    const updatedUsers = users.map((user) =>
      user.id === parseInt(Cookies.get("authToken"))
        ? { ...user, ...updatedData }
        : user,
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const updatedUser = updatedUsers.find(
      (user) => user.id === parseInt(Cookies.get("authToken")),
    );
    if (updatedUser) {
      setUserEmail(updatedUser.email);
      setUserAvatar(
        updatedUser.profile_picture ||
          "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      );
    }
  };

  return (
    <div className="fixed right-0 top-0 z-50 p-4" style={{ direction: "ltr" }}>
      {isLoggedIn ? (
        <>
          <Dropdown placement="bottom-end" className="dark:bg-main">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="bg-main transition-transform hover:scale-105"
                src={userAvatar}
                size="lg"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="إجراءات الملف الشخصي"
              variant="flat"
              className="mt-2 w-64 dark:bg-main dark:text-white"
            >
              {}
              <DropdownItem
                key="profile-picture"
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleUpdateProfilePicture}
              >
                <span className="font-semibold">الصورة الشخصية</span>
              </DropdownItem>

              {}
              <DropdownItem
                key="rate-app"
                className="flex items-center space-x-2 hover:bg-yellow-100 dark:hover:bg-yellow-700"
                onClick={handleRateApp}
              >
                <span className="font-semibold">قيم التطبيق</span>
              </DropdownItem>

              {}
              <DropdownItem
                key="edit-profile"
                className="flex items-center space-x-2 hover:bg-blue-100 dark:hover:bg-blue-700"
                onClick={handleEditProfile}
              >
                <span className="font-semibold">تعديل الملف الشخصي</span>
              </DropdownItem>

              {}
              <DropdownItem
                key="give-ideas"
                className="flex items-center space-x-2 hover:bg-green-100 dark:hover:bg-green-700"
                onClick={handleGiveIdeas}
              >
                <span className="font-semibold">قدم أفكارك</span>
              </DropdownItem>

              {}
              <DropdownItem
                key="logout"
                className="flex items-center space-x-2 hover:bg-red-100 dark:hover:bg-red-700"
                color="error"
                onClick={handleLogout}
              >
                <span className="font-semibold">تسجيل الخروج</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <RateAppModal
            isOpen={isRateAppModalOpen}
            onClose={handleCloseRateAppModal}
            userEmail={userEmail}
          />

          <ProfilePictureModal
            isOpen={isProfilePictureModalOpen}
            onClose={handleCloseProfilePictureModal}
            onProfilePictureUpdated={(newAvatar) => setUserAvatar(newAvatar)}
          />

          <ProfileEditModal
            isOpen={isProfileEditModalOpen}
            onClose={handleCloseProfileEditModal}
            jsonData={users}
            onProfileUpdated={handleProfileUpdated}
          />

          <GiveIdeasModal
            isOpen={isGiveIdeasModalOpen}
            onClose={handleCloseGiveIdeasModal}
          />
        </>
      ) : (
        <Button auto flat color="primary" onClick={handleLogin}>
          تسجيل الدخول
        </Button>
      )}
    </div>
  );
};

export default ProfileDropdown;
