# **Health Check Application**

This project implements a program to monitor the health of HTTP endpoints. It periodically checks the availability of endpoints specified in a YAML configuration file, calculates availability percentages, and logs the results to the console.

---

## **Features**

-   Monitors HTTP/HTTPS endpoints using configuration from a YAML file.
-   Supports `GET` and `POST` requests with custom headers and payloads.
-   Calculates and logs the cumulative availability percentage for each domain.
-   Runs continuously, performing checks every 15 seconds, until manually stopped.

---

## **Prerequisites**

-   **Node.js** (v16+ recommended)
-   **npm** (comes with Node.js)
-   **Docker** (optional, for containerized deployment)

## **Installation**

### Clone the Repository

```sh
git clone https://github.com/your-username/health-check.git

cd health-check

npm install

```

## **Running Locally**

### Compile TypeScript to JavaScript:

```sh
npx tsc
```

### Run the program:

```sh
node dist/main.js config/endpoints.yaml
```

## **Using TypeScript Directly**

```sh
ts-node src/main.ts config/endpoints.yaml
```

## Docker Setup

### **Build the Docker Image**

```sh
docker build -t health-check .
```

### **Run the Docker Container**

```sh
docker run --rm -v $(pwd)/config:/usr/src/app/config health-check
```

### **Using Docker Compose**

```sh
    docker-compose up
```

### **Stop the Program**

If using docker run:\_ Press CTRL+C or stop the container manually:

```sh
docker ps
docker stop <container-id>
```

If using Docker Compose:\_

```sh
docker-compose down
```

## Configuration

The program uses a YAML configuration file to define the endpoints. An example is provided in `config/endpoints.yaml`:

**Sample YAML Configuration**


-   name: Fetch Homepage
    url: https://fetch.com/
    method: GET
    headers:
    user-agent: fetch-synthetic-monitor

-   name: Fetch Careers Page
    url: https://fetch.com/careers
    method: GET
    headers:
    user-agent: fetch-synthetic-monitor

-   name: Fetch Some Fake Post Endpoint
    url: https://fetch.com/some/post/endpoint
    method: POST
    headers:
    content-type: application/json
    user-agent: fetch-synthetic-monitor
    body: '{"foo":"bar"}'

-   name: Fetch Rewards Index Page
    url: https://www.fetchrewards.com/

## Testing

This project uses Jest for unit testing. To run tests:

```sh
npm test
```

## Troubleshooting

1. **Error: Cannot find module /usr/src/app/dist/main.js**

    This error indicates that TypeScript has not compiled the source code:

    npx tsc

    If using Docker, rebuild the Docker image:

    docker-compose build

2. **YAML Configuration Issues**

    Ensure your YAML file is correctly formatted and placed in the `config/` directory.

## Submission Instructions

Ensure the repository includes:

-   Source code (`src/`)
-   YAML configuration (`config/endpoints.yaml`)
-   Docker setup (`Dockerfile` and `docker-compose.yml`)
-   This README file
