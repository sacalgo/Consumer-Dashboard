export interface CustomerEvent {
    store_id: number;
    customers_in: number;
    customers_out: number;
    time_stamp: string; // "10.12.03" or ISO if parsed
  }
  