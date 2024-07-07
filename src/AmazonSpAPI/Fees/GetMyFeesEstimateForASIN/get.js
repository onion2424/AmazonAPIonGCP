export async function get(accesToken) {
    const response = await fetch("https://sellingpartnerapi-fe.amazon.com/products/fees/v0/items/B08WJ81ZS1/feesEstimate", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-amz-access-token": accesToken,
        },
        body: JSON.stringify(
            {
                "FeesEstimateRequest": {
                    "MarketplaceId": "ATVPDKIKX0DER",
                    "IsAmazonFulfilled": true,
                    "PriceToEstimateFees": {
                        "ListingPrice": {
                            "CurrencyCode": "USD",
                            "Amount": 10
                        },
                        "Shipping": {
                            "CurrencyCode": "USD",
                            "Amount": 0
                        }
                    },
                    "Identifier": "B08WJ81ZS1"
                }
            })
        })
        .then((res) => res.json())
        .catch((err) => false);
    return response;
}