export default schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["DELETE"] },
        "sellerId": { "type": "string" },
        "ads-token": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
            }
        },

        "sp_token":
        {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
            }
        }
    }
}

