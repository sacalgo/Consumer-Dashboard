
import express from 'express';
import cors from 'cors';
import { getLiveData, getHistoryData, startKafkaConsumer } from './kafka/consumer';

const app = express();
const PORT = 3001;

app.use(cors());
app.get("/", (_req, res) => {
  res.send("Hi this is the root endpoint, you can check with localhost:3001/live or localhost:3001/history");
});
app.get('/live', (_req, res) => {
  res.json(getLiveData());
});

app.get('/history', (_req, res) => {
  res.json(getHistoryData());
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  startKafkaConsumer();
});
