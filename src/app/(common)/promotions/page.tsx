import PromotionPage from "@/components/view/promotion";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Promotions",
  description:
    "Discover the best articles and promotions curated for you. Stay updated with top picks and expert recommendations",
};

export default function Promotions() {
  return (
    <>
      <PromotionPage />
    </>
  );
}
