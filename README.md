## Build the Docker Image
To build the Docker image for the company data server, run the following command in your terminal:
### `docker build -t company-data-server .`
This will create a Docker image with the tag company-data-server.

## Run the Docker Container
After building the Docker image, you can run the server with this command:
### `docker run -p 3001:3001 company-data-server`
This will start the server on port 3001.

### `npm run start`