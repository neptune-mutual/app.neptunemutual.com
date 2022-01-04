import { Badge } from "@/components/UI/atoms/badge";
import { Divider } from "@/components/UI/atoms/divider";
import { OutlinedCard } from "@/components/UI/molecules/outlined-card";
import { classNames } from "@/utils/classnames";

export const PolicyCard = ({ details }) => {
  const { name, imgSrc, status, claimBefore, purchasedPolicy, claimable } =
    details;

  return (
    <OutlinedCard className="bg-white p-6" type="link">
      <div className="flex justify-between">
        <div>
          <div className="w-18 h-18 bg-DEEAF6 p-3 rounded-full">
            <img src={imgSrc} alt={name} className="inline-block max-w-full" />
          </div>
          <h4 className="text-h4 font-sora font-semibold uppercase mt-4">
            {name}
          </h4>
        </div>
        <div>
          {status && (
            <Badge
              className={classNames(
                status === "Reporting" ? "border-FA5C2F text-FA5C2F" : ""
              )}
            >
              {status}
            </Badge>
          )}
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Stats */}
      <div className="flex justify-between text-sm px-1">
        <div className="flex flex-col">
          <span className="font-semibold text-black text-sm pb-4">
            Claim Before
          </span>
          <span
            className={classNames(
              "pb-4",
              claimable ? "text-FA5C2F" : "text-7398C0"
            )}
          >
            {claimBefore}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-black text-sm pb-4">
            Purchased Policy
          </span>
          <span className="text-7398C0 pb-4">{purchasedPolicy}</span>
        </div>
      </div>

      {claimable && (
        <div className="flex justify-center py-2.5 my-4 w-full bg-4E7DD9 text-white rounded-lg">
          CLAIM
        </div>
      )}
    </OutlinedCard>
  );
};