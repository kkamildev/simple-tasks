import type { FC } from "react";

type Props = {
    progress?: number;
    style?: string;
    barStyle?: string,
    procentVisible?:boolean
}

const ProcentBar: FC<Props> = ({
    progress = 0,
    style = "h-2 bg-gray-700",
    barStyle = "bg-green-500",
    procentVisible = false
}) => {
  const clamped = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="flex items-center gap-3 w-full m-2">
      <div className={`w-full rounded-full overflow-hidden ${style} flex-1`}>
        <div
          className={`${barStyle} h-full transition-all duration-300`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {
        procentVisible &&
        <span className="text-md dark:text-gray-300 text-zinc-950 font-bold w-12 text-right">
          {clamped}%
        </span>
      }
    </div>
  );
};

export default ProcentBar;
