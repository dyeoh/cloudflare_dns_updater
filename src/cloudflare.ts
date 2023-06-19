import axios from 'axios';
import { config } from 'dotenv';

config();

const TOKEN = process.env.CLOUDFLARE_TOKEN;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
export const CLOUDFLARE_DOMAIN = process.env.CLOUDFLARE_DOMAIN;

const cloudflare = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4/',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
});

export const getRecord = async () => {
  return await cloudflare({
    method: 'get',
    url: `zones/${ZONE_ID}/dns_records`,
    params: { name: CLOUDFLARE_DOMAIN },
  });
};

export const createRecord = async (content: string) => {
  return await cloudflare({
    method: 'post',
    url: `zones/${ZONE_ID}/dns_records`,
    data: JSON.stringify({ type: 'A', name: CLOUDFLARE_DOMAIN, content, proxied: false }),
  });
};

export const updateRecord = async (content: string, id: string) => {
  return await cloudflare({
    method: 'put',
    url: `zones/${ZONE_ID}/dns_records/${id}`,
    data: JSON.stringify({ type: 'A', name: CLOUDFLARE_DOMAIN, content, proxied: false }),
  });
};
