import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserType } from "../types/UserType";
interface AdminTabsUserProps {
  users: UserType[] | undefined;
  setSelectedUser: (args: UserType) => void;
  roles: {
    id: number;
    name: string;
  }[];
  openDeleteModal: () => void;
  openRolesModal: () => void;
}
const AdminTabsUser = ({
  users,
  setSelectedUser,
  roles,
  openDeleteModal,
  openRolesModal,
}: AdminTabsUserProps) => {
  return (
    <>
      <ul className="dark:text-white">
        {users?.map((user) => (
          <Popover key={user.id} id="popover" className="relative">
            {({ open }) => (
              <>
                {open && setSelectedUser(user)}
                <Popover.Button
                  className={`
                             ${
                               open
                                 ? "dark:text-white ring-main-purple ring-1"
                                 : "dark:text-white/90"
                             }
                             w-full outline-0`}
                >
                  <li
                    key={user.id}
                    className="w-full relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-lines-dark/20"
                  >
                    <h3 className="text-sm font-medium leading-5 dark:hover:text-main-purple flex">
                      {user.username}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-medium-grey justify-start">
                      <li className="w-1/5 flex items-center">
                        Boards: {user.boards.length}
                      </li>
                      <li className="flex w-1/5">
                        Roles:
                        <div className="flex items-center">
                          {user.roles.map((roleId, index) => (
                            <p key={roleId} className="ml-2 mb-2">
                              {roles.find((r) => r.id === roleId)?.name}
                              {index !== user.roles.length - 1 && ", "}
                            </p>
                          ))}
                        </div>
                      </li>
                      <li className="w-1/4">Email: {user.email}</li>
                    </ul>

                    <a
                      className={`absolute inset-0 rounded-md ring-main-purple focus:z-10 focus:outline-none focus:ring-2`}
                    />
                  </li>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-3 right-0 h-fit">
                    <div className="shadow-lg ring-1 ring-black/5 rounded-lg">
                      <div className="relative flex flex-col bg-white dark:bg-very-dark-grey rounded-lg">
                        <a
                          id="user-delete"
                          onClick={openDeleteModal}
                          className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-red-hover/10 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg hover:cursor-pointer"
                        >
                          <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-destructive-red sm:h-12 sm:w-12 bg-red-hover/70 dark:bg-lines-dark rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Delete user
                            </p>
                            <p className="text-sm text-medium-grey font-thin">
                              This action will delete user and all their data.
                            </p>
                          </div>
                        </a>
                        <a
                          id="user-roles"
                          className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg hover:cursor-pointer"
                          onClick={openRolesModal}
                        >
                          <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Change user roles
                            </p>
                            <p className="text-sm text-medium-grey font-thin">
                              Remove or assign roles to user.
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </ul>
    </>
  );
};
export default AdminTabsUser;
