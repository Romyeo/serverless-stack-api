import stripePackage from 'stripe';
import { cost } from './libs/billing.lib';
import { success, failed } from './libs/response.lib';

export async function main(event) {
  const { storage, source } = JSON.parse(event.body);
  const amount = cost(storage);
  const description = 'Scratch charge';

  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd'
    });

    return success({ status: true });
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
}
