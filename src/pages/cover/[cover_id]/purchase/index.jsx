import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Cover() {
  const router = useRouter();
  const { cover_id } = router.query;

  React.useEffect(() => {
    router.replace(`/cover/${cover_id}/purchase/details`);
  });

  return (
    <>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div />
    </>
  );
}