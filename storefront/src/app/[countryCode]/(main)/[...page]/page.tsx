import { Metadata } from "next";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@modules/common/components/builder";

// Initialize Builder.io
builder.init("e2681541300e4e2d84c04a77559a707c");

export const metadata: Metadata = {
  title: "Builder.io + Medusa Next.js Starter Template",
  description: "A performant e-commerce starter template with Next.js 14 and Medusa.",
};

interface BuilderPageProps {
  params: {
    page?: string[];
    countryCode: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { countryCode, page = [] } = params;
  const urlPath = `/${countryCode}/${page.join("/")}`.replace(/\/$/, "");

  const content = await builder
    .get("page", {
      userAttributes: { urlPath },
      options: { countryCode },
      locale: countryCode,
      prerender: false,
    })
    .toPromise();

  return <RenderBuilderContent content={content} model="page" locale={countryCode} />;
}