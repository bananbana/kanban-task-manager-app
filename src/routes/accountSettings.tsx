import React, { useState } from "react";
import SettingsModal from "../components/SettingsModal";
import { getUserDetails } from "../users";
import { useQuery } from "@tanstack/react-query";
import useUserMutation from "../assets/hooks/useUserMutation";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { IconChevronRight } from "../assets/images/IconChevronRight";

const userQuery = () => ({
  queryKey: ["user_details"],
  queryFn: () => getUserDetails(),
});

const AccountSettings = () => {
  const { data } = useQuery(userQuery());
  const { editUser, deleteAccount } = useUserMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

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

  const handleDeleteAccount = () => {
    const email = data?.email;
    const username = data?.username;
    const userId = data?.id;

    if (userId && username && email) {
      deleteAccount({ userId, username, email, password });
      closeModal();
      setPassword("");
      AuthService.logout();

      navigate("/login");
    }
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
        AuthService.logout();
        // Redirect to login after successful update
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmitMutation = (e: React.FormEvent) => {
    e.preventDefault();
    void handleUserMutation();
  };

  const handleSubmitDelete = (e: React.FormEvent) => {
    e.preventDefault();
    void handleDeleteAccount();
  };
  return (
    <div
      id="container"
      className="h-full w-full flex justify-start items-center flex-col"
    >
      <div className="acc-main">
        <div>
          <div className="acc-compartment" onClick={() => openModal("email")}>
            <span>
              <p>Email</p>
              <p className="text-body-m text-medium-grey group-hover:text-white font-normal pt-2">
                {data?.email}
              </p>
            </span>
            <IconChevronRight className="w-6 h-6" />
          </div>
          <div
            className="acc-compartment"
            onClick={() => openModal("username")}
          >
            <span>
              <p>Username</p>
              <p className="text-body-m text-medium-grey group-hover:text-white font-normal pt-2">
                {data?.username}
              </p>
            </span>
            <IconChevronRight className="w-6 h-6" />
          </div>
          <div
            className="py-6 pl-6 hover:bg-red-hover flex w-full justify-between pr-6 hover:cursor-pointer items-center group"
            onClick={openConfirmModal}
          >
            <span>
              <p className="text-destructive-red group-hover:text-white dark:text-white ">
                Delete your account
              </p>
            </span>
            <IconChevronRight className="w-6 h-6" />

            <DeleteAccountModal
              isOpen={isConfirmOpen}
              closeModal={closeConfirmModal}
              handleDeleteAccount={handleSubmitDelete}
              password={password}
              handlePasswordValidation={handlePasswordValidation}
            />
          </div>
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
        handleSubmit={handleSubmitMutation}
      />
    </div>
  );
};
export default AccountSettings;
