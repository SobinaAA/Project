import { TAGS } from 'data/tags';
import { generateProductData } from 'data/products/generateProduct';
import _ from 'lodash';

export const productUITestDataPositive = [
  {
    testName: 'Should create product with smoke data',
    tags: ['@1CreateProd-UI', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateProductData()
  },
  {
    testName: 'Should create product with valid name',
    tags: ['@2CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Valid Name' })
  },
  {
    testName: 'Should create products with 3 symbols in name',
    tags: ['@3CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBc' })
  },
  {
    testName: 'Should create products with 4 symbols in name',
    tags: ['@4CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBcd' })
  },
  {
    testName: 'Should create products with 39 symbols in name',
    tags: ['@5CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'cojbhkwergnL bqgpkdbpiosvpsdqnivexsmlgo'
    })
  },
  {
    testName: 'Should create products with 40 symbols in name',
    tags: ['@6CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'bkzachhsejzgfnjdvZ hlqdcbqkfarjmswtdjldq'
    })
  },
  {
    testName: 'Should create product with name containing numbers',
    tags: ['@7CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product987' })
  },
  {
    testName: 'Should create product with name containing spaces',
    tags: ['@8CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product 1 Test' })
  },
  {
    testName: 'Should create product with number 1 in price',
    tags: ['@9CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 1 })
  },
  {
    testName: 'Should create product with number 5000 in price',
    tags: ['@10CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 5000 })
  },
  {
    testName: 'Should create product with number 99999 in price',
    tags: ['@11CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 99999 })
  },
  {
    testName: 'Should create product with number 0 in amount',
    tags: ['@12CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '0' }
  },
  {
    testName: 'Should create product with number 999 in amount',
    tags: ['@13CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 999 })
  },
  {
    testName: 'Should create product with number 500 in amount',
    tags: ['@14CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 500 })
  },
  {
    testName: 'Should create product with valid notes',
    tags: ['@15CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Valid Notes' })
  },
  {
    testName: 'Should create product without notes',
    tags: ['@16CreateProd-UI', TAGS.REGRESSION],
    data: _.omit(generateProductData(), 'notes')
  },
  {
    testName: 'Should create product with 1 symbol in notes',
    tags: ['@17CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'A' })
  },
  {
    testName: 'Should create product with 125 symbols in notes',
    tags: ['@18CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'pywcjivphxnlvifhbmzkumzvjmkawqqgxcmthiakxnzwvbeyyrsumsygrogcefdjtwojgkdcecilttvefdrpxehkgpvmdsibofkywrdgijpkqspxurzihurpeezmh'
    })
  },
  {
    testName: 'Should create product with 250 symbols in notes',
    tags: ['@19CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'omelsteekrzrcpnuaasfunzczhnuvnmibbzctwriqnhnoeodpprwagrzasidzvnohzabwaxuhpvozojhjkkskmptzryrvicfbasphvuudnwopeglznsfpjaqjgyocwxuqpnuzlgxeeaixbiqtgsvqlkmihmwesbnfvjkxdewwgjkmwivlaraismrceingvjbsrybxtuxoabbfdngblosdhdrhybjrhbtjcrbtvnacadjeakhqwvrvficfb'
    })
  },
  {
    testName: 'Should create product with special characters in notes',
    tags: ['@20CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: '! @ # $ % ^ & * ( ) _ + - = [ ] { }' })
  },
  {
    testName:
      'Should create product with notes containing non-Latin characters',
    tags: ['@21CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Примечания' })
  }
];

export const productUITestDataNegative = [
  {
    testName: 'Should create a product without name',
    tags: ['@21CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: '' })
  },
  {
    testName: 'Should create a product with a name shorter than 3 characters',
    tags: ['@22CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'ab' })
  },
  {
    testName: 'Should create a product with a name longer than 40 characters',
    tags: ['@23CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      name: 'Zuitmmws gnltfhcdflwjdyacwtleqrbhllkioxcp'
    })
  },
  {
    testName:
      'Should create a product with a name containing special characters',
    tags: ['@24CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product@!' })
  },
  {
    testName:
      'Should create a product with a name containing multiple consecutive spaces',
    tags: ['@25CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product  1' })
  },
  {
    testName:
      'Should create a product with a name containing non-Latin characters',
    tags: ['@26CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ name: 'Продукт1' })
  },
  {
    testName: 'Should create a product with a price below the minimum',
    tags: ['@27CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: 0 })
  },
  {
    testName: 'Should create a product with a negative price',
    tags: ['@28CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ price: -10 })
  },
  {
    testName: 'Should create a product with a non-numeric price',
    tags: ['@29CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: 'invalidPrice' }
  },
  {
    testName: 'Should create a product with a price containing spaces',
    tags: ['@30CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '1 1' }
  },
  {
    testName:
      'Should create a product with a price containing special characters',
    tags: ['@31CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '111!' }
  },
  {
    testName: 'Should create a product without a number in the price field',
    tags: ['@32CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '' }
  },
  {
    testName: 'Should create a product with an amount above the maximum',
    tags: ['@33CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: 1000 })
  },
  {
    testName: 'Should create a product with a negative amount',
    tags: ['@34CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ amount: -10 })
  },
  {
    testName: 'Should create a product with a non-numeric amount',
    tags: ['@35CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: 'invalidAmount' }
  },
  {
    testName: 'Should create a product with an amount containing spaces',
    tags: ['@36CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '1 1' }
  },
  {
    testName:
      'Should create a product with an amount containing special characters',
    tags: ['@37CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '11!' }
  },
  {
    testName: 'Should create a product without a number in the amount field',
    tags: ['@38CreateProd-UI', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '' }
  },
  {
    testName:
      'Should create a product with a notes field exceeding the allowed length',
    tags: ['@39CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'btijjrjrrzlrkikjhgvzynpazoigdbvcnkyzxgxiwdilrtpwbdugtnosbemcqisvvtyxacblxjqhebcmhoacdllxpvxsqjvvzsnfbiufbseouqvbgzjyixlnijqeuqqzccnskmpskzocotcksbjafqececlspqxifiocekaufjntcjmgshxrxkgvagtokchbwsfmugkobpwvifgspwzwcoskyibxigfjuvlvhxtakmicibpskvuhohuhxuz'
    })
  },
  {
    testName: "Should create a product with '<>' symbol in notes",
    tags: ['@40CreateProd-UI', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Test <>' }),
    IsSuccess: false
  }
];
