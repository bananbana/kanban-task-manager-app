import React, { useState } from "react";
import SettingsModal from "../components/SettingsModal";
import { getUserDetails } from "../users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUserMutation from "../assets/hooks/useUserMutation";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const userQuery = () => ({
  queryKey: ["user_details"],
  queryFn: () => getUserDetails(),
});

const AccountSettings = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(userQuery());
  const { editUser } = useUserMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const openModal = (modalType: string) => {
    if (modalType === "email") {
      setEmailModalOpen(true);
    }
    if (modalType === "username") {
      setUsernameModalOpen(true);
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEmailModalOpen(false);
    setUsernameModalOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserMutation = async () => {
    const email = newEmail !== "" ? newEmail : data?.email;
    const username = newUsername !== "" ? newUsername : data?.username;
    const id = data?.id;

    if (id && email && username) {
      try {
        await editUser({ id, username, email, password });
        closeModal();
        setNewEmail("");
        setNewUsername("");
        setPassword("");
        void queryClient.invalidateQueries(["user_details"]);
        AuthService.logout();
        // Redirect to login after successful update
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleUserMutation();
  };
  return (
    <div
      id="container"
      className="h-full w-full flex justify-start items-center flex-col"
    >
      <header
        id="account-settings-header"
        className="border-b-2 border-lines-light dark:border-lines-dark w-full min-h-[140px] flex items-center text-heading-xl dark:text-white"
      >
        <h3 id="admin-header-content" className="ml-8">
          Account Settings
        </h3>
      </header>
      <div className="bg-white flex flex-col w-[480px] rounded-2xl border-collapse mt-10">
        <div
          className="border border-collapse rounded-t-xl border-lines-light py-6 pl-6 hover:bg-main-purple-hover/70 flex w-full justify-between pr-6 dark:border-lines-dark dark:bg-very-dark-grey dark:hover:bg-main-purple dark:text-white hover:cursor-pointer items-center hover:text-white"
          onClick={() => openModal("email")}
        >
          <span>
            <p>Email</p>
            <p className="text-body-m text-medium-grey font-normal">
              {data?.email}
            </p>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div
          className="border border-lines-light rounded-b-xl border-collapse py-6 pl-6 hover:bg-main-purple-hover/70 flex w-full justify-between pr-6 dark:border-lines-dark dark:bg-very-dark-grey dark:hover:bg-main-purple dark:text-white hover:cursor-pointer items-center hover:text-white"
          onClick={() => openModal("username")}
        >
          <span>
            <p>Username</p>
            <p className="text-body-m text-medium-grey font-normal">
              {data?.username}
            </p>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <SettingsModal
        isOpen={isOpen}
        closeModal={closeModal}
        emailModal={emailModalOpen}
        usernameModal={usernameModalOpen}
        email={data?.email}
        username={data?.username}
        newEmail={newEmail}
        newUsername={newUsername}
        handleEmailChange={handleEmailChange}
        handleUsernameChange={handleUsernameChange}
        handlePasswordValidation={handlePasswordValidation}
        password={password}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default AccountSettings;
