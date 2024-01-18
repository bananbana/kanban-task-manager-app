import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserType } from "../types/UserType";
import { IconDeleteUser } from "../assets/images/IconDeleteUser";
import { IconRoles } from "../assets/images/IconRoles";
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
        {users &&
          users.map((user) => (
            <Popover key={user.id} id="popover" className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                             ${
                               open
                                 ? "dark:text-white ring-main-purple ring-1"
                                 : "dark:text-white/90"
                             }
                             w-full outline-0 rounded-xl overflow-hidden hover:bg-gray-100 dark:hover:bg-lines-dark/20 mt-1`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <li key={user.id} className="w-full relative p-4">
                      <h3 className="text-sm font-medium leading-5 dark:hover:text-main-purple flex">
                        {user.username}
                      </h3>

                      <ul className="mt-1 flex text-xs font-normal leading-4 text-medium-grey justify-start items-center flex-wrap">
                        <li className="pc:w-1/4 tablet:w-1/2 flex items-center">
                          <p>
                            Boards:{" "}
                            {user.boards.length ? user.boards.length : "0"}
                          </p>
                        </li>
                        <li className="flex pc:w-1/3 tablet:w-1/2">
                          Roles:
                          <div className="flex items-center">
                            {user.roles.map((roleId, index) => (
                              <p key={roleId} className="ml-2">
                                {roles.find((r) => r.id === roleId)?.name}
                                {user.roles.length
                                  ? index !== user.roles.length - 1 && ", "
                                  : ""}
                              </p>
                            ))}
                          </div>
                        </li>
                        <li className="pc:w-1/4 flex tablet:w-full tablet:mt-2">
                          <p>Email: {user.email}</p>
                        </li>
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
                    <Popover.Panel className="absolute z-10 mt-3 top-1/3 right-0 h-fit">
                      <div className="shadow-lg ring-1 ring-black/5 rounded-lg">
                        <div className="relative flex flex-col bg-white dark:bg-very-dark-grey rounded-lg">
                          <a
                            id="user-delete"
                            onClick={openDeleteModal}
                            className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-red-hover/10 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg hover:cursor-pointer"
                          >
                            <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-destructive-red phone:h-12 phone:w-12 bg-red-hover/70 dark:bg-lines-dark rounded-lg">
                              <IconDeleteUser />
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
                            <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple phone:h-12 phone:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                              <IconRoles />
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
