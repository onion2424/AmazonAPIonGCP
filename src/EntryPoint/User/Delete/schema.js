export default schema =
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "command": { "type": "enum"["DELETE"] },
        "sellerId": { "type": "string" },
        "ADS-API": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
            }
        },

        "SP-API":
        {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "document_id": { "type": "string" },
            }
        }
    }
}

