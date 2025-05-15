# Microservices monorepo

This is microservices based system build with [NestJs](https://nestjs.com/).

## Usage
### Prerequisites
Before you start, ensure you have the following installed:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Server

To run the application simply run:

```bash
$ docker-compose up --build
```

Users API server will be available at localhost on the port specified in the `.env `file under the `USERS_PORT` variable (default: `3001`).

## Accessing API Documentation
Once the application is running, the API documentation is available at the /api endpoint. By default, you can access it at:

http://localhost:3005/api

## Disclaimers
* For simplicity and ease of configuration, I have included a .env file in the repository. I am aware that this is not a secure approach for production-facing applications.