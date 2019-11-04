import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';

import { create, remove, update, list, get } from './libs/service.lib';

const app = express();

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send(`
    <style> body { font-family: sans; padding: 10vh; } </style>

    <h1>Notes API - Serverless</h1>

    <p>
      This particular API Endpoint is running on express. <br />
      I created new endpoints for express Notes API.
    </p>

    <p>Regular endpoints - serverless(fn):</p>
    <ul>
      <li><b>GET</b> /notes</li>
      <li><b>POST</b> /notes</li>
      <li><b>GET</b> /notes/:id</li>
      <li><b>PUT</b> /notes/:id</li>
      <li><b>DELETE</b> /notes/:id</li>
    </ul>

    <p>Express endpoint serverless(express);</p>
    <ul>
      <li><b>GET</b> /express/notes</li>
      <li><b>POST</b> /express/notes</li>
      <li><b>GET</b> /express/notes/:id</li>
      <li><b>PUT</b> /express/notes/:id</li>
      <li><b>DELETE</b> /express/notes/:id</li>
    </ul>
  `);
});

app.get('/express/notes/:id', async (req, res) => {
  const response = await get(req.params.id, req.requestContext);
  res.status(response.statusCode);
  res.header(response.headers);
  res.send(response.body);
});

app.get('/express/notes', async (req, res) => {
  const response = await list(req.requestContext);
  res.status(response.statusCode);
  res.header(response.headers);
  res.send(response.body);
});

app.put('/express/notes/:id', async (req, res) => {
  const response = await update(req.params.id, req.body, req.requestContext);
  res.status(response.statusCode);
  res.header(response.headers);
  res.send(response.body);
});

app.delete('/express/notes/:id', async (req, res) => {
  const response = await remove(req.params.id, req.requestContext);
  res.status(response.statusCode);
  res.header(response.headers);
  res.send(response.body);
});

app.post('/express/notes', async (req, res) => {
  const response = await create(req.body, req.requestContext);
  res.status(response.statusCode);
  res.header(response.headers);
  res.send(response.body);
});

export const main = serverless(app);
