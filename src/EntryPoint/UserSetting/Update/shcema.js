export default schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["UPDATE"] },
        "ads-token": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
            }
        },

        "sp-token":
        {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
                "marketplaceIds": { "type": "array", "items": { "type": "string" } },
            }
        }
    },
    "required" : [
        "command", "ads_token", "sp_token"
    ],
}