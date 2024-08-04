const schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["SYSTEM"] },
        "tag": { "type": "string" },
        "sellerId": { "type": "string" },
        "marketplaceIds": { "type": "array", "items": { "type": "string" } },
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
        "command", "tag", "sellerId", "sp_token", "marketplaceIds"
    ],
}

export default schema;