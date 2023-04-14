## Installation

```bash
$ npm install
```

## Running the app

```bash
# Spin up elasticsearch
docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API
### Create a barcode
```
POST http://localhost:3000/barcodes

{
    "barcode": "00100"
}
```

### Update a barcode
```
PATCH http://localhost:3000/barcodes/:id

{
    "barcode": "00100"
}
```

### Delete a barcode
```
DELETE http://localhost:3000/barcodes/:id
```

### Get a barcode
```
GET http://localhost:3000/barcodes/:id

Response:
{
    "id": 1,
    "barcode": "0000",
    "created_at": "2023-04-14T09:05:52.000Z",
    "updated_at": "2023-04-14T09:05:52.000Z"
}
```

### Get all barcode
```
GET http://localhost:3000/barcodes?filter=1&sort=created_at&order=desc

Response:
{
    "data": [
        {
            "id": 12,
            "barcode": "00100",
            "created_at": "2023-04-14T13:59:59.000Z",
            "updated_at": "2023-04-14T13:59:59.000Z"
        },
        {
            "id": 11,
            "barcode": "00100",
            "created_at": "2023-04-14T13:07:22.000Z",
            "updated_at": "2023-04-14T13:07:22.000Z"
        },
        {
            "id": 10,
            "barcode": "00100",
            "created_at": "2023-04-14T12:44:15.000Z",
            "updated_at": "2023-04-14T13:09:47.000Z"
        },
        {
            "id": 7,
            "barcode": "1111",
            "created_at": "2023-04-14T10:16:26.000Z",
            "updated_at": "2023-04-14T10:16:26.000Z"
        },
        {
            "id": 2,
            "barcode": "1111",
            "created_at": "2023-04-14T09:05:52.000Z",
            "updated_at": "2023-04-14T09:05:52.000Z"
        },
        {
            "id": 3,
            "barcode": "1111",
            "created_at": "2023-04-14T09:05:52.000Z",
            "updated_at": "2023-04-14T09:05:52.000Z"
        },
        {
            "id": 5,
            "barcode": "1234",
            "created_at": "2023-04-14T09:05:52.000Z",
            "updated_at": "2023-04-14T09:05:52.000Z"
        }
    ],
    "pagination": {
        "items_in_current_page": 7,
        "total_items": 7,
        "current_page": 1,
        "next_page": null,
        "prev_page": null,
        "total_page": 1
    }
}
```

## Still on going
The implementation of /suggestion endpoint is still ongoing. My idea is to use ngram search from ElasticSearch to do the job.
