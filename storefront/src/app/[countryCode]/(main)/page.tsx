import { Metadata } from "next"
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@modules/common/components/builder";


import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

builder.init("e2681541300e4e2d84c04a77559a707");

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  /* const content = await builder
  .get("page", {
    userAttributes: { urlPath: "/" },
    options: { countryCode },
    locale: countryCode,
    prerender: false,
  })
  .toPromise(); */

  return (
    <>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}

