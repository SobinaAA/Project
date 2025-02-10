import { TAGS } from 'data/tags';
import { generateProductData } from 'data/products/generateProduct';
import _ from 'lodash';

export const editProductUITestDataPositive = [
  {
    testName: 'Should Edit product with smoke data',
    tags: ['@1EditProd-UI', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateProductData()
  },
  {
    testName: 'Should Edit product with valid name',
    tags: ['@2EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Valid Name' })
  },
  {
    testName: 'Should Edit products with 3 symbols in name',
    tags: ['@3EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBc' })
  },
  {
    testName: 'Should Edit products with 4 symbols in name',
    tags: ['@4EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBcd' })
  },
  {
    testName: 'Should Edit products with 39 symbols in name',
    tags: ['@5EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'cojbhkwergnL bqgpkdbpiosvpsdqnivexsmlgo'
    })
  },
  {
    testName: 'Should Edit products with 40 symbols in name',
    tags: ['@6EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'bkzachhsejzgfnjdvZ hlqdcbqkfarjmswtdjldq'
    })
  },
  {
    testName: 'Should Edit product with name containing numbers',
    tags: ['@7EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product987' })
  },
  {
    testName: 'Should Edit product with name containing spaces',
    tags: ['@8EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product 1 Test' })
  },
  {
    testName: 'Should Edit product with number 1 in price',
    tags: ['@9EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 1 })
  },
  {
    testName: 'Should Edit product with number 5000 in price',
    tags: ['@10EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 5000 })
  },
  {
    testName: 'Should Edit product with number 99999 in price',
    tags: ['@11EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 99999 })
  },
  {
    testName: 'Should Edit product with number 0 in amount',
    tags: ['@12EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '0' }
  },
  {
    testName: 'Should Edit product with number 999 in amount',
    tags: ['@13EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 999 })
  },
  {
    testName: 'Should Edit product with number 500 in amount',
    tags: ['@14EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 500 })
  },
  {
    testName: 'Should Edit product with valid notes',
    tags: ['@15EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Valid Notes' })
  },
  {
    testName: 'Should Edit product without notes',
    tags: ['@16EditProd-UI', TAGS.REGRESSION],
    data: _.omit(generateProductData(), 'notes')
  },
  {
    testName: 'Should Edit product with 1 symbol in notes',
    tags: ['@17EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'A' })
  },
  {
    testName: 'Should Edit product with 125 symbols in notes',
    tags: ['@18EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'pywcjivphxnlvifhbmzkumzvjmkawqqgxcmthiakxnzwvbeyyrsumsygrogcefdjtwojgkdcecilttvefdrpxehkgpvmdsibofkywrdgijpkqspxurzihurpeezmh'
    })
  },
  {
    testName: 'Should Edit product with 250 symbols in notes',
    tags: ['@19EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'omelsteekrzrcpnuaasfunzczhnuvnmibbzctwriqnhnoeodpprwagrzasidzvnohzabwaxuhpvozojhjkkskmptzryrvicfbasphvuudnwopeglznsfpjaqjgyocwxuqpnuzlgxeeaixbiqtgsvqlkmihmwesbnfvjkxdewwgjkmwivlaraismrceingvjbsrybxtuxoabbfdngblosdhdrhybjrhbtjcrbtvnacadjeakhqwvrvficfb'
    })
  },
  {
    testName: 'Should Edit product with special characters in notes',
    tags: ['@20EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: '! @ # $ % ^ & * ( ) _ + - = [ ] { }' })
  },
  {
    testName: 'Should Edit product with notes containing non-Latin characters',
    tags: ['@21EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Примечания' })
  }
];

export const editProductUITestDataNegative = [
  {
    testName: 'Should Edit a product with a name shorter than 3 characters',
    tags: ['@23EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'ab' })
  },
  {
    testName: 'Should Edit a product with a name longer than 40 characters',
    tags: ['@24EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'Zuitmmws gnltfhcdflwjdyacwtleqrbhllkioxcp'
    })
  },
  {
    testName: 'Should Edit a product with a name containing special characters',
    tags: ['@25EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product@!' })
  },
  {
    testName:
      'Should Edit a product with a name containing multiple consecutive spaces',
    tags: ['@26EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product  1' })
  },
  {
    testName:
      'Should Edit a product with a name containing non-Latin characters',
    tags: ['@27EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Продукт1' })
  },
  {
    testName: 'Should Edit a product with a negative price',
    tags: ['@29EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: -10 })
  },
  {
    testName: 'Should Edit a product with a non-numeric price',
    tags: ['@31EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: 'invalidPrice' }
  },
  {
    testName: 'Should Edit a product with a price containing spaces',
    tags: ['@32EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '1 1' }
  },
  {
    testName:
      'Should Edit a product with a price containing special characters',
    tags: ['@33EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '111!' }
  },
  {
    testName: 'Should Edit a product with an amount above the maximum',
    tags: ['@35EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 1000 })
  },
  {
    testName: 'Should Edit a product with a negative amount',
    tags: ['@36EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: -10 })
  },
  {
    testName: 'Should Edit a product with a non-numeric amount',
    tags: ['@37EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: 'invalidAmount' }
  },
  {
    testName: 'Should Edit a product with an amount containing spaces',
    tags: ['@38EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '1 1' }
  },
  {
    testName:
      'Should Edit a product with an amount containing special characters',
    tags: ['@39EditProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '11!' }
  },
  {
    testName:
      'Should Edit a product with a notes field exceeding the allowed length',
    tags: ['@41EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'btijjrjrrzlrkikjhgvzynpazoigdbvcnkyzxgxiwdilrtpwbdugtnosbemcqisvvtyxacblxjqhebcmhoacdllxpvxsqjvvzsnfbiufbseouqvbgzjyixlnijqeuqqzccnskmpskzocotcksbjafqececlspqxifiocekaufjntcjmgshxrxkgvagtokchbwsfmugkobpwvifgspwzwcoskyibxigfjuvlvhxtakmicibpskvuhohuhxuz'
    })
  },
  {
    testName: "Should Edit a product with '<>' symbol in notes",
    tags: ['@42EditProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Test <>' })
  }
];
