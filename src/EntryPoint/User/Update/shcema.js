export default schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["UPDATE"] },
        "name": { "type": "string" },
        "ADS-API": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
                "client_id": { "type": "string" },
                "client_secret": { "type": "string" },
                "refresh_token": { "type": "string" },
            }
        },

        "SP-API":
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
        "command", "name"
    ],
}