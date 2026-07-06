import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import process from 'process';

// 1. Le dice a Node que ignore alertas de certificados SSL del proxy
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 2. Le dice a la librería gRPC de Firebase que use el proxy HTTP
process.env.grpc_proxy = 'http://10.71.110.33:8080';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

