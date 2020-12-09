# Parking App
All example requests are in the Insomnia file
## Endpoints
## Driver
### POST /driver
Create a new driver

### GET /driver
List all drivers

### PUT /driver/:id
Update a driver

### DELETE /driver/:id
Delete a driver

### POST /driver/arrival/:id
Set the time of arrival of a driver

### POST /driver/departure/:id
Set the time of departure of a driver and returns billing information

## Parking Lot

### POST /parkingLot
Create a new parking lot

### GET /parkingLot
List all parking lots

### GET /parkingLot/:id
Show information about a parking lot

## Parking Spaces

### POST /parkingSpaces/:parkingLotId/:numberOfSpaces
Sets number of parking spaces on a parking lot

