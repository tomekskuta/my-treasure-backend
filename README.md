# My treasure game - Backend

[Let's play!](https://my-treasure.tomekskuta.pl/)

To launch app locally clone the repo:

```bash
git clone https://github.com/tomekskuta/my-treasure-backend.git
```

install packages:

```bash
yarn install
# or
npm install
```

and run app:

```bash
yarn start
# or
npm start
```

App starts on `localhost:4000` as default.

Next follow instructions from [frontend](https://github.com/tomekskuta/my-treasure-frontend part.

---

## API - CRU ;p

### GET `/game/:gameId`

##### Response:

```json
{
    "id": "string",
    "userName": "string",
    "score": "integer",
    "finished": "boolean",
    "revealedFields": "[{ coordinates: [integer, integer], status: 'T' | 3 | 2 | 1 | null }]"
}
```

### POST `/game`

##### Request:

```json
{
    "userName": "string"
}
```

##### Response:

```json
{
    "id": "string",
    "userName": "string",
    "score": "integer",
    "finished": "boolean",
    "revealedFields": "[]"
}
```

### PATCH `/game`

##### Request:

```json
{
    "id": "string",
    "revealedFields": "[[integer, integer]]"
}
```

##### Response:

-   if game is not finished:

```json
{
    "id": "string",
    "userName": "string",
    "score": "integer",
    "finished": "boolean",
    "revealedFields": "[{ coordinates: [integer, integer], status: 'T' | 3 | 2 | 1 | null }]"
}
```

-   if game is finished:

```json
{
    "id": "string",
    "userName": "string",
    "score": "integer",
    "finished": "boolean",
    "revealedFields": "[{ coordinates: [integer, integer], status: 'T' | 3 | 2 | 1 | null }]",
    "topScores": "[{
        id: string,
        userName: string,
        score: integer
    }]"
}
```
