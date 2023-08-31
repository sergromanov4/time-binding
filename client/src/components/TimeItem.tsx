import classNames from "classnames";

import type { ITimeEntity } from "@/interfaces/date";

interface ITimeItemProps {
  isActive: boolean;
  timeEntity?: ITimeEntity | null;
  onClick: (value: string) => void;
  text: string;
}

const TimeItem: React.FC<ITimeItemProps> = ({
  isActive,
  timeEntity,
  onClick,
  text,
}) => {
  return (
    <button
      className={classNames(
        "w-full h-22 p-4 rounded-xl border-slate-400 border-2 hover:border-slate-600",
        "disabled:bg-red-400 disabled:cursor-not-allowed",
        {
          ["bg-slate-300"]: !isActive,
          ["bg-green-300"]: isActive,
        },
      )}
      disabled={!!timeEntity}
      onClick={() => onClick(isActive ? "" : text)}
    >
      {text}
    </button>
  );
};

export default TimeItem;
