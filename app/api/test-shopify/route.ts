export const dynamic = "force-dynamic";

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return new Response(
      JSON.stringify({ error: "Missing Shopify domain or access token." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const response = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: `
        query {
      collection(handle: "hidden-homepage-featured-items") {
        title
        description
        products(first: 3) {
          edges {
            node {
              title
              id
            }
          }
        }
      }
    }
      `,
    }),
  });

  const result = await response.json();
  console.log(result); // Inspect in terminal

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
