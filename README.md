# Chat App API Documentation

This API is used for managing messages in a chat application.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repo

```sh
git clone https://github.com/wsgokou/chat-app.git
```

2. Install NPM packages

```sh
pnpm install
```

3. Start the server

```sh
pnpm run server
```

## API Endpoints

### Messages

#### Get Messages

- **URL:** `/messages/:id`
- **Method:** `GET`
- **Auth required:** Yes
- **Description:** Get all messages for a specific conversation.

#### Send Message

- **URL:** `/messages/send/:id`
- **Method:** `POST`
- **Auth required:** Yes
- **Data Params:** `{ "content": [string] }`
- **Description:** Send a new message in a specific conversation.

#### Delete Message

- **URL:** `/messages/delete/:id`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Description:** Delete a specific message.

#### Edit Message

- **URL:** `/messages/edit/:id`
- **Method:** `PATCH`
- **Auth required:** Yes
- **Data Params:** `{ "content": [string] }`
- **Description:** Edit a specific message.

## Error Handling

In case of an error, the API will return a JSON response with a message and an
error status code.

## Built With

- Node.js
- Express
- MongoDB
- Socket.IO
