//const restaurantsDB = // aqui se require la base de datos, me imagino

const restaMock = require('../utils/resta-mocks');

class RestaurantsService {
   async getRestaurants() {
      // const restaurants = await Promise.resolve(restaurantsDB);
      const restaurants = restaMock;
      console.log('Entra en funcion getRestaurants()')
      console.log(restaurants);
      return restaurants;
   }

   async getRestaurant(id) {
      // const restaurant = await Promise.resolve(restaurantsDB[0]);
      const restaurant = restaMock[id - 1];
      return restaurant;
   }

   async createRestaurant() {
      const createdRestaurant = await Promise.resolve(restaurantsDB[0].id);
      return createdRestaurant;
   }

   async updateRestaurant() {
      const updatedRestaurant = await Promise.resolve(restaurantsDB[0].id);
      return updatedRestaurant;
   }

   async deleteRestaurant() {
      const deletedRestaurant = await Promise.resolve(restaurantsDB[0].id);
      return deletedRestaurant;
   }
}

module.exports = RestaurantsService;