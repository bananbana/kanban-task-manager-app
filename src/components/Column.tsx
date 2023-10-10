import { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  statusId: number;
  statusName: string;
  boardId: number;
  statusCount: number | undefined;
}

const Column = ({
  children,
  statusId,
  statusName,
  statusCount,
}: ColumnProps) => {
  return (
    <div className="h-full ml-6 w-72">
      <div className="flex flex-col pt-5">
        <div key={statusId} className="flex items-center flex-row py-3">
          <span className="h-4 w-4 rounded-full bg-red-500"></span>
          <span className="text-medium-grey text-heading-s ml-3">
            {statusName.toUpperCase()} ({statusCount})
          </span>
        </div>
        <div className="h-full overflow-visible pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Column;
