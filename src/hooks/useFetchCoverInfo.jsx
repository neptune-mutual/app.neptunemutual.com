import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNetwork } from "@/src/context/Network";
import { getReplacedString } from "@/utils/string";
import {
  ADDRESS_ONE,
  CoverStatus,
  COVER_INFO_URL,
} from "@/src/config/constants";

const defaultInfo = {
  activeIncidentDate: "0",
  claimPlatformFee: "0",
  commitment: "0",
  isUserWhitelisted: false,
  reporterCommission: "0",
  reportingPeriod: "0",
  requiresWhitelist: false,
  status: "",
  totalCommitment: "0",
  totalPoolAmount: "0",
};

export const useFetchCoverInfo = ({ coverKey }) => {
  const [info, setInfo] = useState(defaultInfo);
  const { account } = useWeb3React();
  const { networkId } = useNetwork();

  useEffect(() => {
    async function fetchCoverInfo() {
      if (!networkId || !coverKey) return;

      try {
        const response = await fetch(
          getReplacedString(COVER_INFO_URL, {
            networkId,
            coverKey,
            account: account || ADDRESS_ONE,
          }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const { data } = await response.json();

        if (!data || Object.keys(data).length === 0) {
          return;
        }

        setInfo({
          activeIncidentDate: data.activeIncidentDate,
          claimPlatformFee: data.claimPlatformFee,
          commitment: data.commitment,
          isUserWhitelisted: data.isUserWhitelisted,
          reporterCommission: data.reporterCommission,
          reportingPeriod: data.reportingPeriod,
          requiresWhitelist: data.requiresWhitelist,
          status: CoverStatus[data.status],
          totalCommitment: data.totalCommitment,
          totalPoolAmount: data.totalPoolAmount,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchCoverInfo();
  }, [account, coverKey, networkId]);

  return info;
};
