import { CustomerEvent } from '@customer-dashboard/shared-types';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const storeId = 10;

const randomEvent = (): CustomerEvent => {
  const inCount = Math.floor(Math.random() * 3);
  const outCount = Math.floor(Math.random() * 3);
  const now = new Date();
  const time_stamp = now.toTimeString().split(' ')[0]; // "10:12:03"

  return {
    store_id: storeId,
    customers_in: inCount,
    customers_out: outCount,
    time_stamp,
  };
};

const produceLoop = async () => {
  await producer.connect();
  console.log('Kafka producer connected');

  setInterval(async () => {
    const msg = randomEvent();
    await producer.send({
      topic: 'customer-events',
      messages: [{ value: JSON.stringify(msg) }],
    });
    console.log('Produced:', msg);
  }, 3000);
};

produceLoop();
