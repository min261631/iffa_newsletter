// lib/dynamo.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// ----- Region & tables -----
export const region = process.env.AWS_REGION || "ap-southeast-2";
export const TABLE_POSTS = process.env.DYNAMO_POSTS_TABLE || "eforum-test-articles";
export const TABLE_SUBSCRIBERS = process.env.DYNAMO_SUBSCRIBERS_TABLE || "";

// ----- Client configuration -----
const clientConfig: any = { 
  region,
  // Add explicit credentials for local development
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined
};

const client = new DynamoDBClient(clientConfig);

export const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
