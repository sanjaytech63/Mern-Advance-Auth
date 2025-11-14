import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { config } from "../config/config";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: config.mailtrapToken!,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Sanjay",
};



