let IS_PROD = true;
const server = IS_PROD ?
    "localhost:8000/api/v1/users" :

    "http://localhost:8000"


export default server;