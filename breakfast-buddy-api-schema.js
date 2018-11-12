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
        favRestaurants: [ ENTITIES.FaveRestaurantItem ],
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
        img: 'https://google.com/image',
        ownedRestaurants: [ ENTITIES.RestaurantItem ]
    },
    restaurantListItem: {
        rid: 123,
        name: 'dons bar and grill',
        isFavourited: true,
    },
    FaveRestaurantItem: { // TODO for ben: this is what I'll be returning in userprofile because I'm returning the resultof query which is a list itself with these 2 values (otherwise I have to iterate over the list again and add isfave field which is useless)
        rid: 123,
        name: 'dons bar and grill',
    },
    favFoodListItem: {
        restaurantId: 123,
        restaurantName: 'ihop',
        foodType: 'pancakes'
    },
    expandedRestaurant: {
        restaurantID = 234,
        RestaurantName = 'Macs',
        OpenHours = ['M:2-2', 'T:32-4',...],
        Address = "293 dkjfj st, city",
        FaveFood = 'eggs',
        FoodTypes = ['eggs', 'pancakes', 'hashbrowns', 'FrenchToast', ...],
    },
    // TODO: return this instead of old one
    searchHistoryListItem: {
        searchID = 23,
        Location: '2394 blah st, city' | NULL,
        lat: 123,
        lon: 123,
        day: 'Mon' | NULL,
        Time: '12' | NULL,
        FoodType: 'pancakes' | NULL,
    },

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
            name: '',
            img: ''
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
            body: [ ENTITIES.searchHistoryListItem ] // with search history values
        }
    },
    userDelLikedRestaurant : {
        type: 'DELETE',
        requestUrl: `${baseURL}/user/${id}/remove-liked-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.restaurantListItem ]
        }
    },

    // TODO:
    //userprofilesearch clear
    // user profile show food fave
    // ~~~~ edit/ remove food item
    // owner add owned restaurant
    // owner delete owned restaurant
    // owner update a retautant
    // restaurant expanded view for user
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
            query2 = 'INSERT INTO Owner (username, oid, name, img) VALUES (:username, :oid, :name, :img) ;'
            const query = query1 + query2
            connection.query(query,
              {
                type: connection.QueryTypes.INSERT,
                replacements: {
                  username: username,
                  password: password,
                  oid: uuidv1(),
                  name: name,
                  img: img,
                }
              })
              res.json({'id': oid, 'name': name, 'owner': true})
          }
          else { // create a regular user
            query1 = 'INSERT INTO Account (username, password) VALUES (:username, :password);'
            query2 = 'INSERT INTO SignedUpUser (username, oid, name, img) VALUES (:username, :oid, :name, :img) ;'
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
            const RestQuery = 'SELECT R.rid, R.name FROM SignedUpUser U, SignedUpUserRestaurantFavourites F, Restaurant R WHERE U.uid = :uid and U.uid == F.uid and R.rid == F.rid;'
            connection.query(RestQueryquery,
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
            const RestQuery = 'SELECT R.rid, R.name FROM Owner O, Restaurant R WHERE O.oid = :oid and O.rid == R.rid;'
            connection.query(RestQuery,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {
                  uid: uid
                }
              })
              .then(restaurants => {
                  res.json(
                      {'oid': oid,
                      'username': user[0].username,
                      'password': user[0].password,
                      'name': user[0].name,
                      'img': user[0].image,
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
    img = req.body.img
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
            const updateQuery = 'UPDATE Owner SET username = :username, name = :name, img = :img WHERE oid = :oid ;' +
                                'UPDATE Account SET username = :username, password = :password;'

            connection.query(updateQuery,
              {
                type: connection.QueryTypes.UPDATE,
                replacements: {
                  username: username,
                  password: password,
                  oid: oid,
                  name: name,
                  img: img,
                }
              })
              res.json(
                {'oid': oid,
                'username': username,
                'password': password,
                'name': name,
                'img': image,
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

router.get('/user-profile/:id/search-history', function (req, res, next) { // TODO: do we want a separate page to load??
    const uid = req.params.id
    const query = 'SELECT * FROM Users WHERE uid = :uid;'
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
            query = 'SELECT S.day, S.openTime, S.postalCode FROM User U, Search S WHERE U.uid = :uid and U.uid == S.uid UNION'
            connection.query(query,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {
                  uid: uid
                }
              })
              .then(searchRes => {
                  res.json(
                      {'uid': uid,
                      'username': user[0].username,
                      'password': user[0].password,
                      'name': user[0].name,
                      'img': user[0].image,
                      'favRestaurants': NULL,
                      'favFoods': NULL,
                      'searches': searchRes
                    })
                })
        } else {
            res.status(404).json({})
        }
      })
})

router.get('/user/:id/remove-liked-restaurant/:rid', function (req, res, next) {
    const uid = req.params.id
    const rid = req.params.rid
    const query = 'SELECT * FROM Users WHERE uid = :uid;'
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
            const RestQuery = 'DELETE FROM  SignedUpUserRestaurantFavourites WHERE uid = :uid and rid = :rid;'
            connection.query(RestQueryquery,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {
                  uid: uid,
                  rid: rid
                }
              })
              res.send('/user-profile/:id') //TODO: is this right?
        } else {
            res.status(404).json({})
        }
      })
})
