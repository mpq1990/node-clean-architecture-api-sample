# simple-car-api

A RESTful car api service

## 👷‍♀️👷‍♂️ Project information

This is a simple node application that exposes end points to manipulate the car resource.

The project is structured to follow the clean architecture model. More details can be found at this blog from uncle bob [source](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

The project is split in to independent layers. Domain, Controller and Framework.

### Domain:

This includes the entities and use cases. This layer does not have any concrete external dependencies. All dependencies are handled following the inversion of control principle and abstractions are injected via constructor methods.

### Controller:

The controller are a mediator between the external world and domain. This layer does not depend on any framework. The only concrete dependency this layer is allowed to have is on the domain.

### Framework

Here is where we put the code that belongs to the frameworks i.e web interface (express in our case), database (mongodb in our case) etc

## 🔨 Steps: Extract & Build on local

#### 1) Use docker-compose. If you have docker and docker compose installed, simply run the following command:

```
docker-compose up --build
```

#### 2) Install node packages and start the server locally. Make sure to have a mongo server running and set the following envs `MONGO_HOST`, `MONGO_PORT` and `MONGO_DB_NAME`

```
npm install
npm run dev
```

## 🕵️‍♂️🕵️‍♀️ Testing

Mocha has been used along with chai and supertest to write tests.

```
npm test
```

## Code Style

Eslint and prettier are used to enforce common syntax, coding style and formatting.

```
npm run format:check
npm run format:write
npm run lint:check
npm run lint:fix
```

## 🏛💲 Improvements

1. ## Replace promise chains to async await. I don't know why i even started this project without them and then didnt stop.
2. Introduce pm2 to make use of all available resources on the machine.
3. Increase testing scope, add more granular unit tests and cover more cases.
4. Add more logic of converting data transfer object from one form to another on the controller/route level.
5. Add Kubernetes template for deployment, service, secret and config map.
6. Run test inside the docker container
7. Add CI/CD
8. Add some documentation to the api like using swagger etc
9. Add static type checking by adding typescript or flow
10. Replace the solution with NEST JS. It uses `convention over configuration` to enforce structure on us to develop application using clean architecture principles.
11. Add proper logging, i.e. using morgen with winston
12. Use a proper dependency injection container i.e. [inversify](https://inversify.io/)
13. The test setup and structure is not great. Have better semantic separation between unit, integration tests etc, have proper setup and clean up, add test coverage tooling.
