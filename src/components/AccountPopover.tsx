import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import IUser from "../types/user.type";
import { Link } from "react-router-dom";

interface PopoverProps {
  logOut: () => void;
  currentUser: IUser | undefined;
}

const options = [
  {
    name: "Account settings",
    description: "Manage your username and email",
    href: "/account_settings",
    icon: IconOne,
  },
  {
    name: "Privacy",
    description: "View your privacy settings",
    href: "/privacy_settings",
    icon: IconTwo,
  },
  {
    name: "Admin Dashboard",
    description: "View admin dashboard",
    href: "/admin",
    icon: IconThree,
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
    <div className="w-full pr-6">
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
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg"
                            >
                              <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                                <item.icon aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-sm text-medium-grey font-thin">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))
                      : options
                          .filter((item) => item.name !== "Admin Dashboard")
                          .map((item) => (
                            <div key={item.name}>
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg"
                              >
                                <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                                  <item.icon aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-medium-grey font-thin">
                                    {item.description}
                                  </p>
                                </div>
                              </a>
                            </div>
                          ))}
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-grey p-4 group">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-very-dark-grey/70 focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50"
                    >
                      <span className="flex items-center">
                        <button
                          className="text-sm font-medium text-medium-grey group-hover:text-main-purple"
                          onClick={logOut}
                        >
                          <Link to="/login" className="nav-link">
                            LogOut
                          </Link>
                        </button>
                      </span>
                    </a>
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

function IconOne() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
      />
    </svg>
  );
}

export default AccountPopover;
