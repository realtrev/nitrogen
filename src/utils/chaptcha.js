import axios from 'axios';

export async function verifyCaptcha(password) {
  const response = await fetch(
    `https://hcaptcha.com/siteverify`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `response=${password}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
      method: "POST",
    }
  );
  const data = await response.json();
  return data.success || false;
}