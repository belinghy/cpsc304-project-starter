const ENTITIES = {
    user: {
        id: 123,
        name: 'rojin',
        owner: boolean
    },
    userProfile: {
        uid: 123,
        username: 'rojin',
        password: 'password',
        name: 's334',
        img: 'https://google.com/image',
        favRestaurants: [ ENTITIES.RestaurantItem ],
        // empty at first
        favFoods: [ ENTITIES.favFoodListItem ],
        // empty at first
        searches: [ ENTITIES.searchHistoryListItem ],
    },
    ownerProfile: {
        oid: 123,
        username: 'rojin',
        password: 'password',
        name: 'jrf',
        ownedRestaurants: [ ENTITIES.RestaurantItem ]
    },
    restaurantListItem: {
        rid: 123,
        name: 'dons bar and grill',
        isFavourited: true,
    },
    RestaurantItem: { // TODO for ben: this is what I'll be returning in userprofile because I'm returning the resultof query which is a list itself with these 2 values (otherwise I have to iterate over the list again and add isfave field which is useless)
        rid: 123,
        name: 'dons bar and grill',
    },
    favFoodListItem: {
        restaurantId: 123,
        restaurantName: 'ihop',
        food_type: 'pancakes'
    },
    expandedRestaurant: {
        restaurantID = 234,
        restaurantName = 'Macs',
        OpenHours = [ENTITIES.HoursOfOpListItem],
        number = "293",
        street = "skj st",
        city = "ewfk",
        postalCode = "efqrf",
        FaveFood = '',
        Food_types = [ENTITIES.FoodTypeListItem],
    },

    // TODO: FOR BEN: had to split this this way because otherwise I have to iterate over list and separate out the values
    searchHistoryLocListItem: {
        sid = 23,
        number: '2394',
        street: 'blah st',
        city : 'sf',
        day: 'Mon',
        Time: '12:00',
    },
    SearchHistoryList: {
        LocTimeList : [ENTITIES.searchHistoryLocListItem],
        FoodType: [ENTITIES.FoodTypeListItem], // This is a list of all foods searched (not specific to loc search!)
    },
    FoodTypeListItem: {
        food_type: 'eggs'
    },
    HoursOfOpListItem : {
        day: 'Monday',
        openTime: '00:00',
        closeTime: '24:00'
    }

}

const REST_ENDPOINTS = {
    login: {
        type: 'GET',
        requestUrl: `${baseURL}/home?username=${username}&password=${password}`,
        body: {
            username: 'foo',
            password: ''
        },
        response: {
            code: 200 || 400, //when the username/ password combo is invalid
            body: ENTITIES.user
        }
    },
    signup: {
        type: 'POST',
        requestUrl: `${baseURL}/signup`,
        body: {
            username: 'foo',
            password: '',
            name: 'ew',
            img: 'url....',
            owner: true             // no need to verify (just a checkbox)
        },
        response: {
            code: 200 || 400, //when the username entered is not unique
            // identifies whether to redirect to /home/owner or to /home/user based on owner value (front end task to redirect to the following 2 endpoints) 
            body: ENTITES.user
        }
    },
    userhome: {
        type: 'GET',
        requestUrl: `${baseURL}/user-home/${id}`,
        body: { NULL },
        response: {
            code: 200 || 404,
            body: ENTITES.user
        }
    },
    ownerhome: {
        type: 'GET',
        requestUrl: `${baseURL}/owner-home/${id}`,
        body: { NULL },
        response: {
            code: 200 || 404,
            body: ENTITES.user
        }
    },
    // TODO: hit this URL on page load (for Ben) and redicrt to ${baseURL}/guest-home/id on response
    guesthome: {
        type: 'GET',
        requestUrl: `${baseURL}/guest-home/`,
        body: { NULL },
        response: {
            code: 200,
            body: {
                userId: 123
            }
        }
    },
    userprofile: {
        type: 'GET',
        requestUrl: `${baseURL}/user-profile/${id}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: userProfile
        }
    },
    ownerprofile: {
        type: 'GET',
        requestUrl: `${baseURL}/owner-profile/${id}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: ownerProfile
        }
    },
    userprofileEdit: {
        type: 'POST',
        requestUrl: `${baseURL}/user-profile/${id}/edit`,
        // TODO: return whole body even if items left blank (for Ben)
        body: {
            username: 'fe',
            password: 'erf',
            name: '',
            // TODO: if img empty, leave it
            img: ''
        },
        response: {
            code: 200 || 404 || 400, //when the username entered is not unique
            body: userProfile // for ben: it will leave faverestaurants/searches as null as I assume those can be retained in backend
        }
    },
    ownerprofileEdit: {
        type: 'POST',
        requestUrl: `${baseURL}/owner-profile/${id}/edit`,
        body: {
            username: 'fe',
            password: 'erf',
            name: ''
        },
        response: {
            code: 200 || 404 || 400, //when the username entered is not unique
            body: ownerProfile      // For ben: same as above (leaves owned restaurants out of this response)
        }
    },
    userprofileSearchHistory: {
        type: 'GET',
        requestUrl: `${baseURL}/user-profile/${id}/search-history`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.SearchHistoryList ]
        }
    },
    userDelLikedRestaurant : {
        type: 'Get',
        requestUrl: `${baseURL}/user/${id}/remove-liked-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.RestaurantItem ]
        }
    },
    userClearSearch : {
        type: 'DELETE',
        requestUrl: `${baseURL}/user/${id}/clear-search-history/`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: NULL  // should retain user profile info on FE and just redirect to user profile showing search history tab as empty
        }
    },
    userprofileFaveFood: {
        type: 'GET',
        requestUrl: `${baseURL}/user-profile/${id}/fave-food`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.favFoodListItem ]
        }
    },
    userDelFaveFood : {
        type: 'Get',
        requestUrl: `${baseURL}/user/${id}/remove-fave-food/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.favFoodListItem ]
        }
    },
    ownerDelOwnedRestaurant : {
        type: 'Get',
        requestUrl: `${baseURL}/owner/${id}/remove-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            // FE should retain owner profile info and redirect to show owner profile with this new list of restaurants
            body: [ ENTITIES.RestaurantItem ] 
        }
    },
    userViewRestaurant :{
        type: 'Get',
        requestUrl: `${baseURL}/view-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: ENTITIES.expandedRestaurant
        }
    },
    // owner add owned restaurant
    // owner update a retautant
    // restaurant expanded view for owner
    // getting search result end point for near me
    // getting search result for manual search loc/time
    //getting search result for manual search by food
}

// corresponding code:
const uuidv1 = require('uuid/v1');

// done
router.get('/home', function (req, res, next) {
    const username = req.query.username
    const password = req.query.password
    const userQuery = 'SELECT * FROM SignedUpUser U, Account A WHERE U.username = :username and A.username == U.username and  A.password = :password;'
    connection.query(userQuery,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {
          username: username,
          password: password
        }
      })
      .then(user => {
        if (user.length === 1 ) {
          // need to return the home page for signed in user
          res.json({'id': user[0].uid, 'name': user[0].name, 'owner': false})
        } else { // check if owner:
            const ownerQuery = 'SELECT * FROM Owner O, Account A WHERE O.username = :username and A.username == O.username and  A.password = :password;'
            connection.query(ownerQuery,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {
                  username: username,
                  password: password
                }
              })
              .then(user => {
                if (user.length === 1 ) {
                  // need to return the home page for signed in user
                  res.json({'id': user[0].oid, 'name': user[0].name, 'owner': true})
                }
                else
                {
                    res.status(400).json({})
                }
            })
        }
    })
})

// done
router.post('/signup', function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const img = req.body.img
    const owner = req.body.owner

    const query = 'SELECT * FROM SignedUpUser WHERE username = :username UNION SELECT * FROM Owner WHERE username = :username;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {
          username: username
        }
      })
      .then(user => {
        if (user.length === 0 ) {
          // username is not in db yet so it will be unique and can add it
          if (owner == true)
          { // create a owner user
            query1 = 'INSERT INTO Account (username, password) VALUES (:username, :password);'
            //Owner user does not have img attribute, will not work removed it
            query2 = 'INSERT INTO Owner (username, oid, name) VALUES (:username, :oid, :name);'
            const query = query1 + query2
            connection.query(query,
              {
                type: connection.QueryTypes.INSERT,
                replacements: {
                  username: username,
                  password: password,
                  oid: uuidv1(),
                  name: name,
                }
              })
              res.json({'id': oid, 'name': name, 'owner': true})
          }
          else { // create a regular user
            query1 = 'INSERT INTO Account (username, password) VALUES (:username, :password);'
            // changed oid to uid in SignedUpuser (uesrname, uid, name, img)
            query2 = 'INSERT INTO SignedUpUser (username, uid, name, img) VALUES (:username, :uid, :name, :img) ;'
            const query = query1 + query2
            connection.query(query,
              {
                type: connection.QueryTypes.INSERT,
                replacements: {
                  username: username,
                  password: password,
                  uid: uuidv1(),
                  name: name,
                  img: img,
                }
              })
              res.json({'id': uid, 'name': name, 'owner': false})
          }
        }
        else { // username already exists so return a fail
            res.status(400).json({})
        }
    })
})

// done
router.get('/guest-home', function (req, res, next) {
    const query = 'INSERT INTO GuestUser (uid) VALUES (:uid) ;'
    connection.query(query,
      {
        type: connection.QueryTypes.INSERT,
        replacements: {
          uid: uuidv1()
        }
      })
      .then(result => {
        res.send(uid)
      })
})

// Done
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
        if (user.length === 1){
            // do another query to get fave restaurants:
            const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE U.uid = :uid and and R.rid == F.rid;'
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
                      'favFoods': NULL,
                      'searches': NULL
                    })
                })
        } else {
            res.status(404).json({})
        }
      })
})

// Done
router.get('/owner-profile/:id', function (req, res, next) {
    const oid = req.params.id
    const query = 'SELECT * FROM Owner WHERE oid = :oid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {
          oid: oid
        }
      })
      .then(owner => {
        if (owner.length === 1){
            // do another query to get restaurants:
            const restQuery ='SELECT rid, name FROM Restaurant WHERE oid = :oid;'
            connection.query(restQuery,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {oid: oid}
              })
              .then(restaurants => {
                  res.json(
                      {'oid': oid,
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

// Done
router.post('/user-profile/:id/edit', function (req, res, next) {
    const uid = req.params.id
    username = req.body.username
    password = req.body.password
    name = req.body.name
    img = req.body.img
    valid = true
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
        if (user.length === 1 ) {
          if (username != '') {
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
                if (anyuser.length != 0){
                    // username is not unique so cant be updated
                    valid = false
                }
            })
          }
          else {
              username = user[0].username
          }
          if (password == '') {
            password = user[0].password
          }
          if (name == '') {
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
                  img: img,
                }
              })
              res.json(
                {'uid': uid,
                'username': username,
                'password': password,
                'name': name,
                'img': image,
                'favRestaurants': NULL,
                'favFoods': NULL,
                'searches': NULL
              })
          } else {
            // username already exists so return a fail
            res.status(400).json({})
          }
        }
        else {
            // user does not exist!!
            res.status(404).json({})
        }
    })
})

// Done
router.post('/owner-profile/:id/edit', function (req, res, next) {
    const oid = req.params.id
    username = req.body.username
    password = req.body.password
    name = req.body.name
    valid = true
    // check if this user even exists
    const queryOID = 'SELECT * FROM Owner WHERE oid = :oid;'
    connection.query(queryOID,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {
          oid: oid
        }
      })
      .then(user => {
        if (user.length === 1 ) {
          if (username != '' && username != user[0].username) {
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
                if (anyuser.length != 0){
                    // username is not unique so can't be updated
                    valid = false
                }
            })
          }
          else {
              username = user[0].username
          }
          if (password == '') {
            password = user[0].password
          }
          if (name == '') {
              name = user[0].name
          }
          if (valid) { // can update user profile with new username or null
            const updateQuery = 'UPDATE Owner SET username = :username, name = :name WHERE oid = :oid ;' +
                                'UPDATE Account SET username = :username, password = :password;'

            connection.query(updateQuery,
              {
                type: connection.QueryTypes.UPDATE,
                replacements: {
                  username: username,
                  password: password,
                  oid: oid,
                  name: name,
                }
              })
              res.json(
                {'oid': oid,
                'username': username,
                'password': password,
                'name': name,
                'ownedRestaurants': NULL
              })
          } else {
            // username already exists so return a fail
            res.status(400).json({})
          }
        }
        else {
            // user does not exist!!
            res.status(404).json({})
        }
    })
})

// Done
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
        if (user.length === 1){
            // do another query to get search history:
            const query2 = 'SELECT S.sid, S.day, S.openTime, L.number, L.street, L.city FROM SignedUpUser U, SignedUpUserLocationTimeSearches S, Location L WHERE U.uid = :uid and U.uid == S.uid and L.postalCode == S.postalCode;'
            connection.query(query2,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {
                  uid: uid
                }
              })
              .then(searchLoc => {
                // do another query to get food search history:
                const query3 = 'SELECT S.food_type FROM SignedUpUser U, SignedUpUserFoodSearches S WHERE U.uid = :uid and U.uid == S.uid;'
                connection.query(query3,
                {
                    type: connection.QueryTypes.SELECT,
                    replacements: { uid: uid }
                })
                .then(searchFood => {
                  res.json({
                    TimeLocationSearch: searchLoc,
                    FoodType: searchFood
                    })
                })
            })
        } else {
            res.status(404).json({})
        }
      })
})

// Done
router.get('/user/:id/remove-liked-restaurant/:rid', function (req, res, next) {
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
        if (user.length === 1){
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
            const restQuery = 'SELECT R.rid, R.name FROM SignedUpUserRestaurantFavourites F, Restaurant R WHERE U.uid = :uid and and R.rid == F.rid;'
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

// Done
router.delete('/user/:id/clear-search-history/', function (req, res, next) {
    const uid = req.params.id
    const userQuery = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
    connection.query(userQuery,
      {
        type: connection.QueryTypes.SELECT,
        replacements: { uid: uid }
      })
      .then(user => {
        if (user.length === 1 ) {
            const delQuery = 'DELETE FROM SignedUpUserLocationTimeSearches where uid = :uid;' +
                              'DELETE FROM SignedUpUserFoodSearches where uid = :uid'
            connection.query(delQuery,
              {
                type: connection.QueryTypes.DELETE,
                replacements: { uid: uid }
              })
              res.status(200).json({})
        } else { // user not found
            res.status(400).json({})
        }
    })
})

// Done
router.get('/user-profile/:id/fave-food', function (req, res, next) {
    const uid = req.params.id
    const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {uid: uid}
      })
      .then(user => {
        if (user.length === 1){
            // do another query to get fave restaurants:
            const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and and R.rid = F.rid;'
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

router.get('/user/:id/remove-fave-food/:rid', function (req, res, next) {
    const uid = req.params.id
    const rid = req.params.rid
    const query = 'SELECT * FROM SignedUpUser WHERE uid = :uid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {uid: ui}
      })
      .then(user => {
        if (user.length === 1){
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
              const foodQuery = 'SELECT R.rid as restaurantId, R.name as restaurantName, F.food_type FROM UserLikesFoodAtRestaurant F, Restaurant R WHERE F.uid = :uid and and R.rid = F.rid;'
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

router.get('/owner/:id/remove-restaurant/:rid', function (req, res, next) {
    const oid = req.params.id
    const rid = req.params.rid
    const query = 'SELECT * FROM Owner WHERE oid = :oid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {oid: oid}
      })
      .then(owner => {
        if (owner.length === 1){
            // do another query to remove restaurant:
            const delQuery = 'DELETE FROM Restaurant WHERE oid = :oid and rid = :rid;'
            connection.query(delQuery,
              {
                type: connection.QueryTypes.DELETE,
                replacements: {
                  uid: uid,
                  rid: rid
                }
              })
              const restQuery = 'SELECT rid, name FROM Restaurant WHERE oid = :oid;'
              connection.query(restQuery,
                {
                  type: connection.QueryTypes.SELECT,
                  replacements: {uid: uid}                })
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
    const query1 = 'SELECT R.rid, R.name, L.city, L.number, L.street, L.postalCode FROM Location L,' +
                    'Restaurant R WHERE R.rid = :rid and L.rid=R.rid;'
    connection.query(query1,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
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
              const query3 = 'SELECT Unique food_type, COUNT(food_type) as best, FROM UserLikesFoodAtRestaurant where rid=:rid group by;' //TODO: fix this query
              connection.query(query4,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then(faves => {
                if (faves.length != 1){
                    FaveFoodItem = faves[0].food_type
                } else {
                    FaveFoodItem = ''
                }
                res.json({
                    restaurantID = restaurant[0].rid,
                    RestaurantName = restaurant[0].name,
                    OpenHours = hoursOfOp,
                    number = restaurant[0].number,
                    street = restaurant[0].street,
                    city = restaurant[0].city,
                    postalCode = restaurant[0].postalCode,
                    FaveFood = FaveFoodItem,
                    Food_types = foods
                })
              })
            })
          })
        } else {
            res.status(404).json({})
        }
      })
})
