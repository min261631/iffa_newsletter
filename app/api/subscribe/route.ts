import { NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLE_SUBSCRIBERS } from "@/lib/dynamo";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  const normalized = email.trim().toLowerCase();
  const now = new Date().toISOString();

  try {
    await ddb.send(new PutCommand({
      TableName: TABLE_SUBSCRIBERS,
      Item: { email: normalized, createdAt: now, confirmed: false },
      ConditionExpression: "attribute_not_exists(email)"
    }));
  } catch (err: any) {
    if (err?.name !== "ConditionalCheckFailedException") {
      console.error(err);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
  }

  // Optional: send a welcome/confirm email via SES (uncomment after SES setup)
  // import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
  // if (process.env.SES_FROM) {
  //   const ses = new SESv2Client({ region: process.env.SES_REGION || process.env.AWS_REGION });
  //   await ses.send(new SendEmailCommand({
  //     FromEmailAddress: process.env.SES_FROM,
  //     Destination: { ToAddresses: [normalized] },
  //     Content: { Simple: { Subject: { Data: "Welcome to the newsletter!" }, Body: { Text: { Data: "Thanks for subscribing." } } } }
  //   }));
  // }

  return NextResponse.json({ ok: true });
}
