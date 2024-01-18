import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import IUser from "../types/user.type";
import { Link } from "react-router-dom";
import { IconSettings } from "../assets/images/IconSettings";
import { IconPrivacy } from "../assets/images/IconPrivacy";
import { IconAdmin } from "../assets/images/IconAdmin";

interface PopoverProps {
  logOut: () => void;
  currentUser: IUser | undefined;
}

const options = [
  {
    name: "Account settings",
    description: "Manage your username and email",
    href: "/account_settings",
    icon: <IconSettings />,
  },
  {
    name: "Privacy",
    description: "View your privacy settings",
    href: "/privacy_settings",
    icon: <IconPrivacy />,
  },
  {
    name: "Admin Dashboard",
    description: "View admin dashboard",
    href: "/admin",
    icon: <IconAdmin />,
  },
];

const AccountPopover = ({ logOut, currentUser }: PopoverProps) => {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.roles) {
      setShowAdminContent(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  return (
    <div className="w-full tablet:pr-6">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center rounded-md text-heading-m font-light hover:text-white hover:scale-105 ml-8 px-2 outline-0 ring-0`}
            >
              <span className="flex items-center h-full">your account</span>
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
              <Popover.Panel className="absolute z-10 mt-3 w-full h-fit">
                <div className="shadow-lg ring-1 ring-black/5">
                  <div className="relative flex flex-col bg-white dark:bg-very-dark-grey rounded-t-lg">
                    {showAdminContent
                      ? options.map((item) => (
                          <div key={item.name}>
                            <Link
                              key={item.name}
                              to={item.href}
                              className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg"
                            >
                              <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                                {item.icon}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-sm text-medium-grey font-thin">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))
                      : options
                          .filter((item) => item.name !== "Admin Dashboard")
                          .map((item) => (
                            <div key={item.name}>
                              <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg"
                              >
                                <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                                  {item.icon}
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-medium-grey font-thin">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          ))}
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-grey p-4 group">
                    <Link
                      to="/login"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-very-dark-grey/70 focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50"
                    >
                      <span className="flex items-center">
                        <button
                          className="text-sm font-medium text-medium-grey group-hover:text-main-purple"
                          onClick={logOut}
                        >
                          LogOut
                        </button>
                      </span>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AccountPopover;
