import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

const uuidv1 = require('uuid/v1')

// tested; works
router.get('/home', function (req, res, next) {
  console.log('in /home, ie after pressing login')
  const username = req.query.username
  const password = req.query.password
  console.log('params: ' + username + ' ' + password)
  // check if its a user:
  const userQuery = 'SELECT * FROM SignedUpUser U, Account A WHERE U.username = :username and A.username = U.username and  A.password = :password;'
  connection.query(userQuery,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        username: username,
        password: password
      }
    })
    .then(user => {
      if (user.length === 1) {
        console.log(user)
        const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(foodQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {uid: user[0].uid}
          })
          .then(favFoodListItem => {
            const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
            connection.query(restQuery,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {uid: user[0].uid}
              })
              .then(restaurants => {
                console.log(restaurants)
                console.log(favFoodListItem)
                res.json({'id': user[0].uid, 'name': user[0].name, 'owner': false, 'favouritedFoods': favFoodListItem, 'likedRestaurants': restaurants})
              })
          })
      } else { // check if owner:
        const ownerQuery = 'SELECT * FROM Owner O, Account A WHERE O.username = :username and A.username = O.username and  A.password = :password;'
        connection.query(ownerQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {
              username: username,
              password: password
            }
          })
          .then(user => {
            if (user.length === 1) {
              res.json({'id': user[0].uid, 'name': user[0].name, 'owner': true, 'favouritedFoods': [], 'likedRestaurants': []})
            } else {
              res.status(400).json({})
            }
          })
      }
    })
})
// tested; works
router.post('/signup', bodyParser.json(), function (req, res, next) {
  console.log('in /signup')
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name
  const owner = req.body.owner
  console.log('body: ' + username + ' ' + password + ' ' + name + ' ' + owner + ' ')
  const id = uuidv1()

  const query = 'SELECT uid FROM SignedUpUser WHERE username = :username UNION SELECT owid FROM Owner WHERE username = :username;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        username: username
      }
    })
    .then(user => {
      if (user.length === 0) {
        // username is not in db yet so it will be unique and can add it
        if (owner === true) { // create a owner user
          const query1 = 'INSERT INTO Account (username, password) VALUES (:username, :password);'
          const query2 = 'INSERT INTO Owner (username, owid, name) VALUES (:username, :owid, :name);'
          const query = query1 + query2
          connection.query(query,
            {
              type: connection.QueryTypes.INSERT,
              replacements: {
                username: username,
                password: password,
                owid: id,
                name: name
              }
            })
          res.json({'id': id, 'name': name, 'owner': true, 'favouritedFoods': [], 'likedRestaurants': []})
        } else { // create a regular user
          var query1 = 'INSERT INTO Account (username, password) VALUES (:username, :password); '
          var query2 = 'INSERT INTO AllUser (uid) VALUES (:uid); '
          var query3 = 'INSERT INTO SignedUpUser (username, uid, name) VALUES (:username, :uid, :name);'
          const query = query1 + query2 + query3
          connection.query(query,
            {
              type: connection.QueryTypes.INSERT,
              replacements: {
                username: username,
                password: password,
                uid: id,
                name: name
              }
            })
          res.json({'id': id, 'name': name, 'owner': false, 'favouritedFoods': [], 'likedRestaurants': []})
        }
      } else { // username already exists so return a fail
        res.status(400).json({})
      }
    })
})
// tested; works
router.get('/guest-home', function (req, res, next) {
  const uid = uuidv1()
  console.log('in guest')
  const query = 'INSERT INTO AllUser (uid) VALUES (:uid) ;'
  connection.query(query,
    {
      type: connection.QueryTypes.INSERT,
      replacements: {
        uid: uid
      }
    })
    .then(result => {
      res.send(uid)
    })
})

router.get('/user-profile/:id', function (req, res, next) {
  const uid = req.params.id
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to get fave restaurants:
        const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(restQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {
              uid: uid
            }
          })
          .then(restaurants => {
            res.json(
              {'uid': uid,
                'username': user[0].username,
                'password': user[0].password,
                'name': user[0].name,
                'img': user[0].image,
                'favRestaurants': restaurants,
                'favFoods': null,
                'searches': null
              })
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.get('/owner-profile/:id', function (req, res, next) {
  const owid = req.params.id
  const query = 'SELECT * FROM Owner WHERE owid = :owid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        owid: owid
      }
    })
    .then(owner => {
      if (owner.length === 1) {
        // do another query to get restaurants:
        const restQuery = 'SELECT rid, name FROM Restaurant WHERE owid = :owid;'
        connection.query(restQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {owid: owid}
          })
          .then(restaurants => {
            res.json(
              {'owid': owid,
                'username': owner[0].username,
                'password': owner[0].password,
                'name': owner[0].name,
                'img': owner[0].image,
                'ownedRestaurants': restaurants
              })
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.post('/user-profile/:id/edit', bodyParser.json(), function (req, res, next) {
  const uid = req.params.id
  var username = req.body.username
  var password = req.body.password
  var name = req.body.name
  var img = req.body.img
  var valid = true
  // check if this user even exists
  const queryUID = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(queryUID,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        if (username !== '') {
          // check if new username is unique
          const queryUsername = 'SELECT from SignedUpUser WHERE username = :username UNION SELECT from Owner WHERE username = :username;'
          connection.query(queryUsername,
            {
              type: connection.QueryTypes.SELECT,
              replacements: {
                username: username
              }
            })
            .then(anyuser => {
              if (anyuser.length !== 0) {
                // username is not unique so cant be updated
                valid = false
              }
            })
        } else {
          username = user[0].username
        }
        if (password === '') {
          password = user[0].password
        }
        if (name === '') {
          name = user[0].name
        }
        if (valid) { // can update user profile with new username or null
          const updateQuery = 'UPDATE SignedUpUser SET username = :username, name = :name, img = :img WHERE uid = :uid;' +
                                'UPDATE Account SET username = :username, password = :password;'
          connection.query(updateQuery,
            {
              type: connection.QueryTypes.UPDATE,
              replacements: {
                username: username,
                password: password,
                uid: uid,
                name: name,
                img: img
              }
            })
          res.json(
            {'uid': uid,
              'username': username,
              'password': password,
              'name': name,
              'img': img,
              'favRestaurants': null,
              'favFoods': null,
              'searches': null
            })
        } else {
          // username already exists so return a fail
          res.status(400).json({})
        }
      } else {
        // user does not exist!!
        res.status(404).json({})
      }
    })
})

router.post('/owner-profile/:id/edit', bodyParser.json(), function (req, res, next) {
  const owid = req.params.id
  var username = req.body.username
  var password = req.body.password
  var name = req.body.name
  var valid = true
  // check if this user even exists
  const queryowid = 'SELECT * FROM Owner WHERE owid = :owid;'
  connection.query(queryowid,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        owid: owid
      }
    })
    .then(user => {
      if (user.length === 1) {
        if (username !== '' && username !== user[0].username) {
          // check if new username is unique
          const queryUsername = 'SELECT from SignedUpUser WHERE username = :username UNION SELECT from Owner WHERE username = :username;'
          connection.query(queryUsername,
            {
              type: connection.QueryTypes.SELECT,
              replacements: {
                username: username
              }
            })
            .then(anyuser => {
              if (anyuser.length !== 0) {
                // username is not unique so can't be updated
                valid = false
              }
            })
        } else {
          username = user[0].username
        }
        if (password === '') {
          password = user[0].password
        }
        if (name === '') {
          name = user[0].name
        }
        if (valid) { // can update user profile with new username or null
          const updateQuery = 'UPDATE Owner SET username = :username, name = :name WHERE owid = :owid ;' +
                                'UPDATE Account SET username = :username, password = :password;'

          connection.query(updateQuery,
            {
              type: connection.QueryTypes.UPDATE,
              replacements: {
                username: username,
                password: password,
                owid: owid,
                name: name
              }
            })
          res.json(
            {'owid': owid,
              'username': username,
              'password': password,
              'name': name,
              'ownedRestaurants': null
            })
        } else {
          // username already exists so return a fail
          res.status(400).json({})
        }
      } else {
        // user does not exist!!
        res.status(404).json({})
      }
    })
})

router.get('/user-profile/:id/search-history', function (req, res, next) {
  const uid = req.params.id
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to get search history:
        const query2 = 'SELECT S.sid, S.day, S.openTime as time, L.street, L.city FROM SignedUpUser U, SignedUpUserLocationTimeSearches S, Location L WHERE U.uid = :uid and U.uid = S.uid and L.lat = S.lat and L.lon = S.lon;'
        connection.query(query2,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {
              uid: uid
            }
          })
          .then(searchLoc => {
            res.json(searchLoc)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.delete('/user/:id/remove-liked-restaurant/:rid', function (req, res, next) {
  const uid = req.params.id
  const rid = req.params.rid
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to remove liked restaurants:
        const delQuery = 'DELETE FROM SignedUpUserRestaurantFavourites WHERE uid = :uid and rid = :rid;'
        connection.query(delQuery,
          {
            type: connection.QueryTypes.DELETE,
            replacements: {
              uid: uid,
              rid: rid
            }
          })
        const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(restQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {
              uid: uid
            }
          })
          .then(restaurants => {
            res.json(restaurants)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.delete('/user/:id/clear-search-history/', function (req, res, next) {
  const uid = req.params.id
  const userQuery = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(userQuery,
    {
      type: connection.QueryTypes.SELECT,
      replacements: { uid: uid }
    })
    .then(user => {
      if (user.length === 1) {
        const delQuery = 'DELETE FROM SignedUpUserLocationTimeSearches where uid = :uid;' +
                              'DELETE FROM SignedUpUserFoodSearches where uid = :uid'
        connection.query(delQuery,
          {
            type: connection.QueryTypes.DELETE,
            replacements: { uid: uid }
          })
        res.json([])
      } else { // user not found
        res.status(400).json({})
      }
    })
})

router.get('/user-profile/:id/fave-food', function (req, res, next) {
  const uid = req.params.id
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {uid: uid}
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to get fave restaurants:
        const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(foodQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {uid: uid}
          })
          .then(faveFoods => {
            res.json(faveFoods)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.delete('/user/:id/remove-fave-food/:rid', function (req, res, next) {
  const uid = req.params.id
  const rid = req.params.rid
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {uid: uid}
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to remove liked restaurants:
        const delQuery = 'DELETE FROM UserLikesFoodAtRestaurant WHERE uid = :uid and rid = :rid;'
        connection.query(delQuery,
          {
            type: connection.QueryTypes.DELETE,
            replacements: {
              uid: uid,
              rid: rid
            }
          })
        const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(foodQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {uid: uid}
          })
          .then(favFoodListItem => {
            res.json(favFoodListItem)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.delete('/owner/:owid/remove-restaurant/:rid', function (req, res, next) {
  const owid = req.params.owid
  const rid = req.params.rid
  const query = 'SELECT * FROM Owner WHERE owid = :owid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {owid: owid}
    })
    .then(owner => {
      if (owner.length === 1) {
        // do another query to remove restaurant:
        const delQuery = 'DELETE FROM Restaurant WHERE owid = :owid and rid = :rid;'
        connection.query(delQuery,
          {
            type: connection.QueryTypes.DELETE,
            replacements: {
              owid: owid,
              rid: rid
            }
          })
        const restQuery = 'SELECT rid, name FROM Restaurant WHERE owid = :owid;'
        connection.query(restQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {owid: owid}
          })
          .then(RestaurantItem => {
            res.json(RestaurantItem)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.get('/view-restaurant/:rid', function (req, res, next) {
  const rid = req.params.rid
  const query1 = 'SELECT R.rid, R.name, L.city, L.number, L.street, L.postalCode, L.lat, L.lon FROM Location L,' +
                    'Restaurant R WHERE R.rid = :rid and L.rid=R.rid;'
  connection.query(query1,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {rid: rid}
    })
    .then(restaurant => {
      if (restaurant.length === 1) {
        const query2 = 'SELECT day, openTime, closeTime FROM RestaurantHoursOfOperation where rid=:rid;'
        connection.query(query2,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {rid: rid}
          })
          .then(hoursOfOp => {
            const query3 = 'SELECT food_type FROM FoodsServedAtRestaurants where rid=:rid;'
            connection.query(query3,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then(foods => {
                const query4 = 'SELECT ULF.food_type FROM Restaurant R, UserLikesFoodAtRestaurant ULF ' +
                        'WHERE R.rid = :rid GROUP BY ULF.food_type HAVING COUNT(ULF.rid) >= ALL ' +
                        '(SELECT COUNT(ULF.food_type) FROM RESTAURANT R, UserLikesFoodAtRestaurant ULF WHERE R.rid = :rid ' +
                        'GROUP BY ULF.food_type);'
                connection.query(query4,
                  {
                    type: connection.QueryTypes.SELECT,
                    replacements: {rid: rid}
                  })
                  .then(faves => {
                    var FaveFoodItem
                    if (faves.length === 1) {
                      FaveFoodItem = faves[0].food_type
                    } else {
                      FaveFoodItem = 'N/A'
                    }
                    res.json({
                      restaurantID: restaurant[0].rid,
                      RestaurantName: restaurant[0].name,
                      OpenHours: hoursOfOp,
                      number: restaurant[0].number,
                      street: restaurant[0].street,
                      city: restaurant[0].city,
                      postalCode: restaurant[0].postalCode,
                      lat: restaurant[0].lat,
                      lon: restaurant[0].lon,
                      faveFood: FaveFoodItem,
                      foodTypes: foods
                    })
                  })
              })
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.post('/:owid/add-restaurant/', bodyParser.json(), function (req, res, next) {
  const owid = req.params.owid
  const name = req.body.restaurantName
  const OpenHours = req.body.OpenHours
  const number = req.body.number
  const street = req.body.street
  const city = req.body.city
  const postalCode = req.body.postalCode
  const foodTypes = req.body.foodTypes
  const lat = req.body.lat
  const lon = req.body.lon
  const rid = uuidv1()
  const query1 = 'SELECT * from owner where owid=:owid;'
  connection.query(query1,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {owid: owid}
    })
    .then(owner => {
      if (owner.length === 1) {
        if (OpenHours.length === 0 || foodTypes.length === 0) {
          res.status(400).json({})
        } else {
          const query2 = 'INSERT INTO Restaurant (rid, name, owid) VALUES (:rid, :name, :owid);'
          connection.query(query2,
            {
              type: connection.QueryTypes.INSERT,
              replacements: {
                rid: rid,
                name: name,
                owid: owid
              }
            })
          const query3 = 'SELECT * FROM Location where lat = :lat and lon = :lon and rid NOT null;'
          connection.query(query3,
            {
              type: connection.QueryTypes.SELECT,
              replacements: {lat: lat, lon: lon}
            })
            .then(loc => {
              if (loc.length !== 0) {
                res.status(400) // location belongs to some other restaurant so cant accept this!
              } else {
                const query4 = 'INSERT INTO Location (postalCode, lat, lon, city, street, number, rid) Values ' +
                                '(:postalCode, :lat, :lon, :city, :street, :number, :rid);'
                connection.query(query4,
                  {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                      postalCode: postalCode,
                      lat: lat,
                      lon: lon,
                      city: city,
                      street: street,
                      number: number,
                      rid: rid
                    }
                  })
                // indert hours of op
                for (var t in OpenHours) {
                  // insert into hours of operation (either exists and is not added or is added)
                  const query5 = 'INSERT INTO HoursOfOperation (day, openTime, closeTime) VALUES (:day, :openTime, :closeTime);'
                  connection.query(query5,
                    {
                      type: connection.QueryTypes.INSERT,
                      replacements: {
                        day: t.day,
                        openTime: t.openTime,
                        closeTime: t.closeTime
                      }
                    })
                  const query6 = 'INSERT INTO RestaurantHoursOfOperation (day, openTime, closeTime, rid) VALUES (:day, :openTime, :closeTime, :rid);'
                  connection.query(query6,
                    {
                      type: connection.QueryTypes.INSERT,
                      replacements: {
                        day: t.day,
                        openTime: t.openTime,
                        closeTime: t.closeTime,
                        rid: rid
                      }
                    })
                }
                // insert food types served
                for (var f in foodTypes) {
                  const query7 = 'INSERT INTO Food (food_type) VALUES (:food_type);'
                  connection.query(query7,
                    {
                      type: connection.QueryTypes.INSERT,
                      replacements: {food_type: f.food_type}
                    })
                  const query8 = 'INSERT INTO FoodsServedAtRestaurants (rid, food_type) VALUES (:rid, :food_type);'
                  connection.query(query8,
                    {
                      type: connection.QueryTypes.INSERT,
                      replacements: {rid: rid, food_type: f.food_type}
                    })
                }
                const query9 = 'SELECT rid, name from Restaurant where owid=:owid;'
                connection.query(query9,
                  {
                    type: connection.QueryTypes.SELECT,
                    replacements: {owid: owid}
                  })
                  .then(restaurants => {
                    res.json(restaurants)
                  })
              }
            })
        }
      } else {
        res.status(404).json({})
      }
    })
})

router.post('/user/:id/search-restaurant', bodyParser.json(), function (req, res, next) {
  console.log('in search: /user/:id/search-restaurant')
  const uid = req.params.id
  const lat = req.body.lat
  const lon = req.body.lng
  const time = req.body.time
  const day = req.body.day
  console.log('body: ' + uid + ' ' + lat + ' ' + lon + ' ' + time + ' ' + day)
  // TODO: calculate in BE using geo lib thing 
  const city = ''
  const street = ''
  var endTime = (parseInt(time.slice(0, 2)) + 1)
  if (endTime < 10) {
    endTime = '0' + endTime.toString() + ':00'
  } else {
    endTime = endTime.toString() + ':00'
  }
  const closeTime = endTime
  console.log(time + ' ' + closeTime)
  const query = 'SELECT R.rid, R.name, H.CloseTime as OpenUntil FROM Restaurant R, Location L, RestaurantHoursOfOperation H ' +
  'WHERE R.rid = L.rid and R.rid = H.rid and H.day = :day and  H.closeTime >= :closeTime AND ' +
  '(3956 * 2 * ASIN(SQRT(' +
      'POWER(SIN((abs(:lon) - abs(L.lat)) * pi()/180 / 2),2) + ' +
      '(COS(abs(:lon) * pi()/180 ) * COS(abs(L.lat) *  pi()/180) * ' +
      'POWER(SIN((abs(:lat) - (L.lon)) *  pi()/180 / 2), 2)) ' +
      '))) <= 5;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        closeTime: closeTime,
        lat: lat,
        lon: lon,
        day: day
      }
    })
    .then(restaurants => {
      if (restaurants.length > 1) {
        console.log('results found!' + restaurants[0])
        // store search into search history DB!
        const sid = uuidv1()
        const insert1 = 'INSERT INTO Location (lat, lon, city, street) VALUES (:lat, :lon, :city, :street);'
        connection.query(insert1,
          {
            type: connection.QueryTypes.INSERT,
            replacements: {lat: lat, lon: lon, city: city, street: street}
          })
        const insert2 = 'INSERT INTO SignedUpUserLocationTimeSearches (uid, day, openTime, closeTime, lat, lon, sid) VALUES ' +
                            '(:uid, :day, :openTime, :closeTime, :lat, :lon, :sid);'
        connection.query(insert2,
          {
            type: connection.QueryTypes.INSERT,
            replacements: {
              uid: uid,
              day: day,
              openTime: time,
              closeTime: closeTime,
              lat: lat,
              lon: lon,
              sid: sid
            }
          })
        var resultList = []
        for (var r in restaurants) {
          var food = '*'
          // do another query to find the faveFood at this restaurant
          const query2 = 'SELECT ULF.food_type FROM Restaurant R, UserLikesFoodAtRestaurant ULF ' +
                             'WHERE R.rid = :rid GROUP BY ULF.food_type HAVING COUNT(ULF.rid) >= ALL ' +
                             '(SELECT COUNT(ULF.food_type) FROM RESTAURANT R, UserLikesFoodAtRestaurant ULF WHERE R.rid = :rid ' +
                             'GROUP BY ULF.food_type);'
          connection.query(query2,
            {
              type: connection.QueryTypes.SELECT,
              replacements: {rid: r.restaurantID}
            })
            .then(foods => {
              if (foods.length > 0) {
                food = foods[0].food_type
              }
            })
          var result = {
            restaurantID: r.restaurantID,
            restaurantName: r.restaurantName,
            faveFood: food,
            lat: r.lat,
            lon: r.lon,
            closeTime: r.closeTime
          }
          resultList.concat(result)
        }
        res.json(resultList)
      } else {
        res.status(400).json({}) // no results found!
      }
    })
})

router.post('/user/:id/like-restaurant/:rid', bodyParser.json(), function (req, res, next) {
  const uid = req.params.id
  const rid = req.params.rid
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to add liked restaurant:
        const insertQuery = 'INSERT INTO SignedUpUserRestaurantFavourites (rid, uid) VALUES (:rid, :uid);'
        connection.query(insertQuery,
          {
            type: connection.QueryTypes.INSERT,
            replacements: {
              uid: uid,
              rid: rid
            }
          })
        const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE F.uid = :uid and R.rid = F.rid;'
        connection.query(restQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {
              uid: uid
            }
          })
          .then(restaurants => {
            console.log(restaurants)
            res.json(restaurants)
          })
      } else {
        res.status(404).json({})
      }
    })
})

router.post('/user/:id/like-food/:rid', bodyParser.json(), function (req, res, next) {
  const uid = req.params.id
  const rid = req.params.rid
  const foodType = req.body.food_type
  const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
  connection.query(query,
    {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid
      }
    })
    .then(user => {
      if (user.length === 1) {
        // do another query to add liked restaurant:
        const insertQuery = 'INSERT INTO UserLikesFoodAtRestaurant (uid, food_type, rid) VALUES (:uid, :food_type, :rid);'
        connection.query(insertQuery,
          {
            type: connection.QueryTypes.INSERT,
            replacements: {
              uid: uid,
              food_type: foodType,
              rid: rid
            }
          })
        const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and and R.rid = F.rid;'
        connection.query(foodQuery,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {uid: uid}
          })
          .then(favFoodListItem => {
            res.json(favFoodListItem)
            console.log(favFoodListItem)
          })
      } else {
        res.status(404).json({})
      }
    })
})

export default router
