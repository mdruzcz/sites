// Copy for the online kit store, kept in one place so the listing page, the kit
// pages and the homepage never disagree. Server-side only: it reads the order
// policy, which pulls in the postal-code distance table.
//
// Where each fact comes from:
// - Shipping numbers: lib/orders/policy, the same file checkout charges from.
// - Payment, packing time, warranty, phone support: what the cart, the order
//   emails and content/warranty.json already say.
// - Returns: the terms published on permanentlightingdirect.ca/shipping-returns
//   for the same kits (same shop, same billing company). Forever Lights had no
//   written return policy before this, so confirm with Matt that these terms
//   apply to Forever Lights orders before it goes live, and edit RETURNS if not.
import { FREE_RADIUS_KM, FLAT_RATE_CAD, SHOP } from '@/lib/orders/policy';

export { FREE_RADIUS_KM, FLAT_RATE_CAD };
export const SHOP_TOWN = SHOP.town;

/** One line, safe to show anywhere a shopper might wonder "do they ship to me?". */
export const SHIP_LINE = `Ships across Canada. Free within ${FREE_RADIUS_KM} km of our Ontario shop, $${FLAT_RATE_CAD} flat rate everywhere else.`;

export const RETURNS = {
  title: '30-day returns',
  short: 'Unused, complete and in the original packaging. Return shipping is at your expense.',
  full: 'Unused kits in their original packaging, complete with every part, can be returned within 30 days of delivery for a refund of the kit price. Return shipping is at your expense, and we recommend a tracked service. A controller or power supply that has been powered up is exchanged under warranty rather than refunded.',
};

export interface KitFaq {
  key: string;
  q: string;
  a: string;
}

export const kitFaq: KitFaq[] = [
  {
    key: 'canada',
    q: 'Do you ship DIY kits outside Ontario?',
    a: `Yes. Kits ship to every province and territory from our shop in ${SHOP.town}, Ontario. You do not need to live in our London-area installation territory to buy one. Outside the free shipping zone it is a flat $${FLAT_RATE_CAD} per order, whatever the size of the kit.`,
  },
  {
    key: 'shipping',
    q: 'How much is shipping?',
    a: `Shipping is free within ${FREE_RADIUS_KM} km of our shop in ${SHOP.town}, just south of London: most of Southwestern Ontario, Kitchener-Waterloo, Hamilton, Niagara and most of the GTA. Anywhere else in Canada it is a flat $${FLAT_RATE_CAD} per order. Checkout shows which applies as soon as you enter your postal code, and GST or HST for your province is added there too. Kits are packed within one to two business days and tracking is emailed when your order ships.`,
  },
  {
    key: 'pay',
    q: 'How do I pay for a kit?',
    a: 'Choose a size and track colour, add it to your cart and check out by credit card, debit, Apple Pay or Google Pay on Stripe’s secure page. Kits are invoiced by our billing company, Master Decker Inc., and your invoice is emailed as soon as the payment goes through. For a custom colour match, use the question form and we will quote it.',
  },
  {
    key: 'returns',
    q: 'Can I return a kit?',
    a: RETURNS.full,
  },
  {
    key: 'size',
    q: 'Which size do I need?',
    a: 'Measure the rooflines you want lit, in feet, and round up. Our cost estimator will also give you a length if you pick your home size. If you are between sizes, tell us in the notes and we will help you choose. Every kit ships with a little more track than its nominal length to allow for corners and offcuts.',
  },
  {
    key: 'colour',
    q: 'Which track colour should I order?',
    a: 'Match the fascia or soffit the track will be screwed to, not your siding, brick or shingles. White suits white vinyl or aluminum soffit and fascia. Black suits dark fascia, black eavestrough or black window frames. Brown suits brown fascia and wood-tone trim. Beige / tan suits cream, sand or tan trim. If you are between two colours, choose the darker one, because it sits in the shadow under the roofline. The colour makes no difference to the light.',
  },
  {
    key: 'install',
    q: 'How hard is the install?',
    a: 'If you are comfortable working from a ladder and using a cordless drill, it is a weekend job on a single-storey home. The connectors are sealed twist fittings, so there is no cutting or soldering, and the power supply plugs into an existing GFCI outlet. Two-storey and steep rooflines are where most people decide to have us install it instead.',
  },
  {
    key: 'warranty',
    q: 'What warranty comes with a kit?',
    a: 'DIY kits carry the same 5-year parts warranty as our installed systems. The 1-year workmanship warranty applies only where our own crew did the install, since we cannot warranty how a kit was mounted.',
  },
  {
    key: 'extend',
    q: 'Can I add to a kit later?',
    a: 'Yes. The system is modular, so you can extend a run or light another elevation later with more track, strands and connectors. Tell us what you already have and we will quote the add-on parts.',
  },
];

export function kitFaqByKeys(keys: string[]): KitFaq[] {
  return keys.map(k => kitFaq.find(f => f.key === k)).filter((f): f is KitFaq => !!f);
}
