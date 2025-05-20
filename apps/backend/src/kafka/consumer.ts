import { Kafka } from 'kafkajs';
import { CustomerEvent } from '@customer-dashboard/shared-types';

const kafka = new Kafka({
  clientId: 'backend',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'dashboard-group' });

let liveEvents: CustomerEvent[] = [];
let historyMap: Record<string, CustomerEvent[]> = {}; // hour → events

export const getLiveData = () => liveEvents.slice(-10); // last 10 events
export const getHistoryData = () => historyMap;

export const startKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'customer-events', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();
      if (!value) return;

      const event: CustomerEvent = JSON.parse(value);
      liveEvents.push(event);

      // Format timestamp to hour (e.g., "10:00")
      const hourKey = event.time_stamp.split(':')[0] + ":00";
      if (!historyMap[hourKey]) historyMap[hourKey] = [];
      historyMap[hourKey].push(event);
    },
  });

  console.log('Kafka consumer started');
};
