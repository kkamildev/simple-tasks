import type { FC } from "react";

type Props = {
    amount?:number,
    maxAmount?:number
    style?: string,
    barStyle?: string,
}

const AmountBar : FC<Props> = ({
    amount = 0,
    maxAmount = 10,
    style = "h-2 bg-gray-700",
    barStyle = "bg-green-500",
}) => {
    const clamped = Math.min(Math.max(amount / maxAmount * 100, 0), 100);
    return (
      <div className="flex items-center gap-3 w-full m-2">
        <div className={`w-full rounded-full overflow-hidden ${style} flex-1`}>
            <div
            className={`${barStyle} h-full transition-all duration-300`}
            style={{ width: `${clamped}%` }}
            />
        </div>
        <span className="text-md dark:text-gray-300 text-zinc-950 font-bold w-16 text-right">
            {amount} / {maxAmount}
        </span>
      </div>
    );
}

export default AmountBar;