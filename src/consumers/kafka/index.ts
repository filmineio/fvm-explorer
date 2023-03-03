import { Network } from "@/enums/Network";
import { newSubscriber } from "@/subscribers/index";
import { Consumer, Kafka } from "kafkajs";

import { EventHandler } from "@/types/EventHandler";
import { EventMap } from "@/types/EventMap";
import { Subscriber } from "@/types/Subscriber";
import { Subscribers } from "@/types/Subscribers";
import { SubscriptionTopic } from "@/types/SubscriptionTopic";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const newKafkaConsumer = async <T extends EventMap>(
  ctx: ApiCtx,
  network: Network
) => {
  const subscribers: Subscribers<T> = {} as Subscribers<T>;

  const consumer = ctx.kafka[network]?.consumer({
    groupId: "flow",
  }) as Consumer;

  const subscribe = async (
    sub: SubscriptionTopic<T> | Subscriber<T>,
    handler?: EventHandler<T>
  ): Promise<void> => {
    let subscriber = undefined;

    if (typeof sub === "object") {
      subscriber = sub as Subscriber<T>;
    } else {
      subscriber = newSubscriber(sub, handler as EventHandler<T>);
    }

    await consumer.subscribe({ topic: subscriber.topic as string });

    if (subscribers[subscriber.topic]) {
      subscribers[subscriber.topic].push(subscriber);
      return;
    }

    subscribers[subscriber.topic] = [subscriber];
  };

  const startConsumer = async (): Promise<void> => {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const parsedMessage = JSON.parse(
          message.value?.toString() as string
        ) as T[keyof T];

        subscribers[topic].forEach((subscriber: Subscriber<T>) =>
          subscriber.handler(parsedMessage, network, topic, partition)
        );
      },
    });
  };

  return {
    subscribe,
    startConsumer,
  };
};
