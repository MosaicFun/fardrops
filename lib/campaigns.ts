import { sql } from "@vercel/postgres"

export async function getCampaigns(user_id: string) {
    const { rows } = await sql`
    SELECT * FROM campaigns WHERE user_id = ${user_id};
  `;
  return rows;
}