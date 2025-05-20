import { useEffect, useState } from 'react';
import { CustomerEvent } from '@customer-dashboard/shared-types';

export default function Home() {
  const [live, setLive] = useState<CustomerEvent[]>([]);
  const [history, setHistory] = useState<Record<string, CustomerEvent[]>>({});

  useEffect(() => {
    const fetchLive = () => {
      fetch('http://localhost:3001/live')
        .then(res => res.json())
        .then(data => setLive(data));
    };

    const fetchHistory = () => {
      fetch('http://localhost:3001/history')
        .then(res => res.json())
        .then(data => setHistory(data));
    };

    fetchHistory();
    fetchLive();
    const interval = setInterval(fetchLive, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h2>🟢 Live Table</h2>
      <table>
        <thead>
          <tr><th>Store</th><th>IN</th><th>OUT</th><th>Time</th></tr>
        </thead>
        <tbody>
          {live.map((e, i) => (
            <tr key={i}>
              <td>{e.store_id}</td><td>{e.customers_in}</td><td>{e.customers_out}</td><td>{e.time_stamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>📘 History Table (per hour)</h2>
      <table>
        <thead>
          <tr><th>Hour</th><th>Total IN</th><th>Total OUT</th></tr>
        </thead>
        <tbody>
          {Object.entries(history).map(([hour, events], i) => {
            const totalIn = events.reduce((sum, e) => sum + e.customers_in, 0);
            const totalOut = events.reduce((sum, e) => sum + e.customers_out, 0);
            return (
              <tr key={i}>
                <td>{hour}</td><td>{totalIn}</td><td>{totalOut}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
