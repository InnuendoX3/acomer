/* const restaurantsDB = require('../db/connection');

//const restaMock = require('../utils/resta-mocks');

class RestaurantsService {

   async getRestaurants() {
      //const restaurants = {};
      
      await restaurantsDB.query('SELECT * FROM restaurants', (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            //console.log('De services: ');
            //console.log(rows);

            return rows;
         }
         //return restaurants;
      });
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


module.exports = RestaurantsService; */