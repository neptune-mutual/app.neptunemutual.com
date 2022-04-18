import { useState } from "react";
import { useRouter } from "next/router";
import { useCoverInfo } from "@/src/hooks/useCoverInfo";
import { AcceptRulesForm } from "@/common/components/AcceptRulesForm/AcceptRulesForm";
import { CoverRules } from "@/common/components/CoverRules/CoverRules";
import { ProvideLiquidityForm } from "@/src/common/components/LiquidityForms/ProvideLiquidityForm";
import { CoverActionsFooter } from "@/common/components/Cover/CoverActionsFooter";
import { Container } from "@/common/components/Container/Container";
import { SeeMoreParagraph } from "@/src/common/components/SeeMoreParagraph";
import { CoverProfileInfo } from "@/common/components/CoverProfileInfo/CoverProfileInfo";
import { BreadCrumbs } from "@/common/components/BreadCrumbs/BreadCrumbs";
import { Hero } from "@/src/common/components/Hero";
import { getCoverImgSrc, toBytes32 } from "@/src/helpers/cover";
import { CoverPurchaseResolutionSources } from "@/common/components/Cover/Purchase/CoverPurchaseResolutionSources";
import { convertFromUnits } from "@/utils/bn";
import { useMyLiquidityInfo } from "@/src/hooks/provide-liquidity/useMyLiquidityInfo";
import { formatCurrency } from "@/utils/formatter/currency";

export const CoverAddLiquidityDetailsPage = () => {
  const [acceptedRules, setAcceptedRules] = useState(false);

  const router = useRouter();
  const { cover_id } = router.query;
  const coverKey = toBytes32(cover_id);
  const { coverInfo } = useCoverInfo(coverKey);
  const { info, isWithdrawalWindowOpen, accrueInterest } = useMyLiquidityInfo({
    coverKey,
  });

  const imgSrc = getCoverImgSrc(coverInfo);

  const totalLiquidity = info.totalLiquidity;
  const reassuranceAmount = info.totalReassurance;

  const handleAcceptRules = () => {
    setAcceptedRules(true);
  };

  if (!coverInfo) {
    return <>loading...</>;
  }

  return (
    <>
      <Hero>
        <Container className="px-2 py-20">
          <BreadCrumbs
            pages={[
              { name: "Home", href: "/", current: false },
              {
                name: coverInfo?.coverName,
                href: `/cover/${cover_id}/options`,
                current: false,
              },
              { name: "Provide Liquidity", current: true },
            ]}
          />
          <div className="flex">
            <CoverProfileInfo
              coverKey={coverKey}
              imgSrc={imgSrc}
              projectName={coverInfo?.coverName}
              links={coverInfo?.links}
            />
          </div>
        </Container>
      </Hero>

      {/* Content */}
      <div className="pt-12 pb-24 border-t border-t-B0C4DB">
        <Container className="grid grid-cols-3 md:gap-32">
          <div className="col-span-3 md:col-span-2">
            {/* Description */}
            <span className="hidden md:block">
              <SeeMoreParagraph text={coverInfo.about}></SeeMoreParagraph>
            </span>

            {acceptedRules ? (
              <div className="mt-12">
                <ProvideLiquidityForm coverKey={coverKey} info={info} />
              </div>
            ) : (
              <>
                <CoverRules rules={coverInfo?.rules} />
                <br className="mt-20" />
                <AcceptRulesForm onAccept={handleAcceptRules}>
                  I have read, understood, and agree to the terms of cover rules
                </AcceptRulesForm>
              </>
            )}
          </div>

          <span className="block col-span-3 row-start-1 md:hidden mb-11">
            <SeeMoreParagraph text={coverInfo.about}></SeeMoreParagraph>
          </span>
          <div className="col-span-3 row-start-2 md:col-auto md:row-start-auto">
            <CoverPurchaseResolutionSources coverInfo={coverInfo}>
              <hr className="mt-4 mb-6 border-t border-B0C4DB/60" />
              <div
                className="flex justify-between pb-2"
                title={formatCurrency(convertFromUnits(totalLiquidity)).long}
              >
                <span className="">Total Liquidity:</span>
                <strong className="font-bold text-right">
                  {formatCurrency(convertFromUnits(totalLiquidity)).short}
                </strong>
              </div>
              <div
                className="flex justify-between"
                title={formatCurrency(convertFromUnits(reassuranceAmount)).long}
              >
                <span className="">Reassurance:</span>
                <strong className="font-bold text-right">
                  {formatCurrency(convertFromUnits(reassuranceAmount)).short}
                </strong>
              </div>
            </CoverPurchaseResolutionSources>
            <div className="flex justify-end">
              {isWithdrawalWindowOpen && (
                <button
                  className="mt-4 mr-2 text-sm text-4e7dd9 hover:underline disabled:hover:no-underline"
                  onClick={accrueInterest}
                >
                  Accrue
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <CoverActionsFooter activeKey="add-liquidity" />
    </>
  );
};
