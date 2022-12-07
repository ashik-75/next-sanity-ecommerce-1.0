import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // this is from those question during 'sanity init'
  apiVersion: "2021-08-31",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export function urlFor(source) {
  return builder.image(source);
}
