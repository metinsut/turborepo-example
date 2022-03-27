export interface MetricType {
  id?: string;
  name?: 'Updown' | 'Response' | 'Repair' | 'Part Supply' | string;
  isMetricExist?: boolean;
  isDefault?: boolean;
  notes?: string;
  lastUpdated?: string;
}
