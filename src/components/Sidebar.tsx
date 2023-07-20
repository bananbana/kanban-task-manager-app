import Toggle from "./Toggle";
import data from "../assets/data.json";

interface SidebarProps {
  isDarkTheme: boolean;
  changeTheme: (args: boolean) => void;
  hideSidebar: () => void;
  sidebarHidden: boolean;
}

const Sidebar = ({
  changeTheme,
  isDarkTheme,
  hideSidebar,
  sidebarHidden,
}: SidebarProps) => {
  return (
    <>
      <div
        className={`${sidebarHidden ? "hidden" : "w-[300px] h-[1024px]"} ${
          isDarkTheme
            ? "bg-dark-grey border-lines-dark"
            : "bg-white border-lines-light"
        } border  flex flex-col relative`}
      >
        <div className="px-[34px] py-[32.78px]">
          <img
            src={`/src/assets/images/${
              isDarkTheme ? "logo-light" : "logo-dark"
            }.svg`}
          ></img>
        </div>
        <div className="absolute inset-y-[112px] h-fit w-full flex flex-col">
          <span className="text-medium-grey text-heading-s pb-[14px] pl-[32px] pr-[24px]">
            ALL BOARDS(3)
          </span>
          <div className="flex flex-row h-[48px] group items-center hover:bg-main-purple rounded-r-full pl-[32px] mr-[34px]">
            <svg
              className="w-[16px] h-[16px] group-hover:fill-white fill-grey"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <p className="text-heading-m group-hover:text-white text-medium-grey px-[18px]">
              Platform Launch
            </p>
          </div>
          <div className="flex flex-row h-[48px] group items-center hover:bg-main-purple rounded-r-full pl-[32px] mr-[34px]">
            <svg
              className="w-[16px] h-[16px] group-hover:fill-white fill-grey"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <p className="text-heading-m group-hover:text-white text-medium-grey px-[18px]">
              Marketing Plan
            </p>
          </div>
          <div className="flex flex-row h-[48px] group items-center hover:bg-main-purple rounded-r-full pl-[32px] mr-[34px]">
            <svg
              className="w-[16px] h-[16px] group-hover:fill-white fill-grey"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <p className="text-heading-m group-hover:text-white text-medium-grey px-[18px]">
              Roadmap
            </p>
          </div>
          <button>
            <div className="flex-row flex h-[48px] items-center pl-[32px] mr-[34px]">
              <svg
                className="w-[16px] h-[16px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="#635FC7"
                />
              </svg>
              <p className="text-heading-m text-main-purple px-[18px]">
                + Create New Board
              </p>
            </div>
          </button>
        </div>
        <div className="flex flex-row justify-center">
          <Toggle
            handleClick={() => changeTheme(isDarkTheme)}
            isDarkTheme={isDarkTheme}
          ></Toggle>
        </div>
        <span className="absolute group bottom-[32px] w-[251px] h-[48px] flex flex-row left-[31px] items-center hover:cursor-pointer">
          <svg
            width="18"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:fill-light-grey fill-grey"
          >
            <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
          </svg>
          <button
            className="text-medium-grey text-heading-m group-hover:text-light-grey pl-[15px]"
            onClick={() => hideSidebar()}
          >
            Hide Sidebar
          </button>
        </span>
      </div>
    </>
  );
};

export default Sidebar;
