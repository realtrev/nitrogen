import axios from "axios";

async function getProviders() {
  const providers = await axios.get("https://dev.paridax.xyz/api/tokens").catch((err) => {
    console.log(err);
    return
  });
  console.log(providers);
  return providers;
}

export { getProviders };