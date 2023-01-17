# Super CoW Bro

Multi-player platform game.

Rules are simple!

- Avoid the deadly Sandwitch attacks 🥪. You touch a sandwitch, you are dead!
- Collect CoW Tokens! 🐮
- Try to reach the door to the next leve!

## Develop

```
# Install dependencies
yarn

# Run the Frontend and Backend
yarn start
```

Open http://localhost:8080

## Environment variables

- `PORT`: Port used for the services API

```
# Start the services in a different port
PORT=9090 yarn start
```

## Build with Docker

```
# Build
docker build . -t super-cow-bro

# Run
docker run -d super-cow-bro
```

## Run with docker-compose

```
# Run
docker-compose up -d

# Check out the logs
docker-compose logs -f
```
