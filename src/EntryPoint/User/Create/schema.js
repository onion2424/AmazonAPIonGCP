const schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["CREATE"] },
        "name": { "type": "string" },
        "sellerId": { "type": "string" },
        "sellerStartDate": { "type": "string" },
        "ADS-API": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
                "profileId": { "type": "string" },
            },
            "required" : [
                "client_id", "client_secret", "refresh_token", "profileId"
            ],
        },

        "SP-API":
        {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
                "marketplaceIds": { "type": "array", "items": { "type": "string" } },
            },
            "required" : [
                "client_id", "client_secret", "refresh_token", "marketplaceIds"
            ],
        },
    },
    "required" : [
        "command", "name", "sellerId"
    ],
}

export default schema;