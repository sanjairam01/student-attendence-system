# REST API Specifications

Base URL: `/api/v1`

## Responses Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": null
}
```

## Error Response Format
```json
{
  "success": false,
  "message": "Invalid parameters provided",
  "errors": "Detailed validation messages"
}
```
