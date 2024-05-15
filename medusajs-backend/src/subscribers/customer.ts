import { type SubscriberConfig, type SubscriberArgs, CustomerService } from "@medusajs/medusa";

export default async function handleCustomerCreated({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const segmentService = container.resolve("segmentService");

  const customerData = data;
  delete customerData["password_hash"];

  this.segmentService.track({
    event: "Customer Created",
    userId: data.id,
    properties: customerData,
  });
}

export const config: SubscriberConfig = {
  event: CustomerService.Events.CREATED,
  context: {
    subscriberId: "customer-created-handler",
  },
};
