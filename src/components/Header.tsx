interface HeaderProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  openModal: () => void;
}

const Header = ({ isDarkTheme, sidebarHidden, openModal }: HeaderProps) => {
  return (
    <header
      className={`${
        isDarkTheme
          ? "bg-dark-grey border-lines-dark"
          : "bg-white border-lines-light"
      } flex flex-row justify-between items-center w-full h-[96px] absolute top-0 right-0 border-b px-[24px] py-[29px]`}
    >
      <div className="w-[190px] h-[30px] text-heading-xl flex items-center">
        <span>
          <img
            src={`/src/assets/images/${
              isDarkTheme ? "logo-light" : "logo-dark"
            }.svg`}
          ></img>
        </span>
        <p
          className={`${isDarkTheme ? "text-white" : "text-black"} absolute ${
            sidebarHidden ? "left-[242px]" : "left-[324px]"
          }`}
        >
          Platform Launch
        </p>
      </div>
      <div className="w-[192.62px] h-[48] flex justify-between items-center">
        <button
          className="w-[168px] h-[48px] border border-none bg-main-purple hover:bg-main-purple-hover text-[#FFFFFF] font-bold rounded-full"
          onClick={() => openModal()}
        >
          + Add New Task
        </button>
        <button>
          <img src="/src/assets/images/icon-vertical-ellipsis.svg"></img>
        </button>
      </div>
    </header>
  );
};

export default Header;
