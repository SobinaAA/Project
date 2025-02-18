import { DELIVERY_CONDITIONS, IDelivery } from 'data/types/orders.types';
import moment from 'moment';
import { simpleFaker } from '@faker-js/faker';
import { COUNTRIES } from 'data/customers/countries';
import { getRandromEnumValue } from 'utils/enum/getRandomValue';

export function generateDelivery() {
  const delivery: IDelivery = {
    condition: getRandromEnumValue(DELIVERY_CONDITIONS),
    finalDate: moment().add(5, 'days').format('YYYY/MM/DD'),
    address: {
      country: getRandromEnumValue(COUNTRIES),
      city: `${simpleFaker.string.alpha(7)}`,
      street: `${simpleFaker.string.alpha(7)}`,
      house: +simpleFaker.string.numeric(2),
      flat: +simpleFaker.string.numeric(2)
    }
  };
  return delivery;
}
