const schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["CREATE"] },
        "tag": { "type": "string" },
        "sellerId": { "type": "string" },
        "sellerStartDate": { "type": "string" },
        "profileId": { "type": "string" },
        "marketplaceIds": { "type": "array", "items": { "type": "string" } },
        "ads_token": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
            },
            "required" : [
                "client_id", "client_secret", "refresh_token"
            ],
        },

        "sp_token":
        {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
            },
            "required" : [
                "client_id", "client_secret", "refresh_token"
            ],
        },
    },
    "required" : [
        "command", "tag", "sellerId", "ads_token", "sp_token", "profileId", "marketplaceIds"
    ],
}

export default schema;