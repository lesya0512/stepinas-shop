// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const colors = ['white', 'black', 'green', 'blue']
const clothTypes = ['w-shirt']
const images = [
  '/img/tovar/shirt-black-1.jpg',
  '/img/tovar/shirt-black-2.jpg',
  '/img/tovar/shirt-black-3.jpg',
  '/img/tovar/shirt-blue-1.jpg',
  '/img/tovar/shirt-green-1.jpg',
  '/img/tovar/shirt-white-1.jpg',
  '/img/tovar/shirt-white-2.jpg',
]
const fabricTypes = [
  'natural',
  'non-natural',
  'mixed',
  'non-woven',
  'stockinette',
]
const features = [
  'breathable material, knitwear',
  'contrasting color',
  'soft fabric',
  'hood, pockets',
]
const liningMaterials = ['taffeta', 'viscose', 'polyester', 'chiffon', 'satin']

module.exports = {
  async up(db) {
    return db.collection('cloth').insertMany(
      [...Array(50)].map(() => {
        const type = clothTypes[Math.floor(Math.random() * clothTypes.length)]
        const color = getRandomArrayValue(colors); // Выбираем случайный цвет
        const сolorImages = images.filter((item) => item.includes(`-${color}`)); // Фильтруем изображения по цвету
        const characteristics = [
          {
            type: 'w-shirt',
            color: color,
            fabricTypes: getRandomArrayValue(fabricTypes),
            features: getRandomArrayValue(features),
            liningMaterials: getRandomArrayValue(liningMaterials),
          }

        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.type === type
        )

        return {
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentence(10),
          characteristics: currentCharacteristics,
          images: сolorImages,
          vendorCode: faker.string.numeric(2),
          isNew: faker.datatype.boolean(),
          inStock: faker.string.numeric(2),
          sizes: {
            42: faker.datatype.boolean(),
            44: faker.datatype.boolean(),
            46: faker.datatype.boolean(),
            48: faker.datatype.boolean(),
            oversize: faker.datatype.boolean(),
          },
        }
      })
    )
  },

  async down(db) {
    return db.collection('cloth').drop()
  },
}