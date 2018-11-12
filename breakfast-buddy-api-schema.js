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
        favRestaurants: [ ENTITIES.restaurantItem ],
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
        profilePicUrl: 'https://google.com/image',
        ownedRestaurants: [ ENTITIES.RestaurantItem ]
    },
    RestaurantItem: {
        rid: 12,
        name: 'werf'
    },
    restaurantListItem: {
        rid: 123,
        name: 'dons bar and grill',
        isFavourited: true,
    },
    favFoodListItem: {
        restaurantId: 123,
        restaurantName: 'ihop',
        foodType: 'pancakes'
    },
    searchHistoryListItem: {
        day: 'mond',
        time: '34',
        postalCode: 'v7t hf7f'
    },
    expandedRestaurant: {
        restaurantID = 234,
        RestaurantName = 'Macs',
        OpenHours = ['M:2-2', 'T:32-4',...],
        Address = "293 dkjfj st, city",
        FaveFood = 'eggs',
        FoodTypes = ['eggs', 'pancakes', 'hashbrowns', 'FrenchToast', ...],
    },
    SearchHistoryListItem: {
        seachID = 23,
        Location: '2394 blah st, city' | NULL,
        day: 'Mon' | NULL,
        Time: '12' | NULL,
        FoodType: 'pancakes' | NULL,
    },
    
}

const REST_ENDPOINTS = {
    login: {
        type: 'GET',
        requestUrl: `${baseURL}/home`,
        body: {
            username: 'foo',
            password: ''
        },
        response: {
            code: 200,
            // identifies whether to redirect to /home/owner or to /home/user or to not redirectbased on username/password verification
            body: user || false
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
            code: 200,
            // identifies whether to redirect to /home/owner or to /home/user or to not redirectbased on username if username already exists
            body: user || false
        }
    },
    Userhome: {
        type: 'GET',
        requestUrl: `${baseURL}/user-home/${id}`,
        body: { NULL },
        response: {
            code: 200 || 404,
            body: user
        }
    },
    ownerhome: {
        type: 'GET',
        requestUrl: `${baseURL}/owner-home/${id}`,
        body: { NULL },
        response: {
            code: 200 || 404,
            body: user
        }
    },
    guesthome: {
        type: 'GET',
        requestUrl: `${baseURL}/guest-home/`,
        body: { NULL },
        response: {
            code: 200,
            body: NULL
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
        body: {
            username: 'fe',
            password: 'erf',
            name: '',
            img: ''
        },
        response: {
            code: 200 || 404,
            body: userProfile || false // false when the username entered is not unique
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
            code: 200 || 404,
            body: ownerProfile || false // false when the username entered is not unique
        }
    },
    userprofileSearchHistory: {
        type: 'GET',
        requestUrl: `${baseURL}/user-profile/${id}/search-history`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: userProfile // with search history values
        }
    }, // TODO: do we want sep endpoints for this and fave foods at places?? then also TODO: favefoods..
    userDelLikedRestaurant : {
        type: 'DELETE',
        requestUrl: `${baseURL}/user/${id}/remove-liked-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: userProfile
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
router.get('/home', function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    const userQuery = 'SELECT * FROM Users WHERE username = :username and password = :password;'
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
            const ownerQuery = 'SELECT * FROM Owner WHERE username = :username and password = :password;'
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
                    res.send(false)
                }
            })
        }
    })
})

router.post('/signup', function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const img = req.body.img
    const owner = req.body.owner

    const query = 'SELECT * FROM User WHERE username = :username UNION SELECT * FROM Owner WHERE username = :username;'
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
            const query = 'INSERT INTO Owner (username, password, oid, name, img) VALUES (:username, :password, :oid, :name, :img) ;'
            connection.query(query, 
              { 
                type: connection.QueryTypes.INSERT,
                replacements: {
                  username: username,
                  password: password,
                  oid: 1, //TODO: gen sequentially
                  name: name,
                  img: img,
                }
              })
              res.json({'id': oid, 'name': name, 'owner': true})
          }
          else { // create a regular user
            const query = 'INSERT INTO User (username, password, uid, name, img) VALUES (:username, :password, :uid, :name, :img) ;'
            connection.query(query, 
              { 
                type: connection.QueryTypes.INSERT,
                replacements: {
                  username: username,
                  password: password,
                  uid: 1, //TODO: gen sequentially
                  name: name,
                  img: img,
                }
              })
              res.json({'id': uid, 'name': name, 'owner': false})
          }
        }
        else { // username already exists so return a fail
            res.send(false)
        }
    })
})

router.get('/guest-home', function (req, res, next) {
    const query = 'INSERT INTO GuestUsers (uid) VALUES (:uid) ;'
    connection.query(query,
      {
        type: connection.QueryTypes.INSERT,
        replacements: {
          uid: 1, // TODO: fix this to gen next uid
        }
      })
      .then(result => {
        // result[1] is the number of rows changed
        res.send('/home/guest')
      })
})
  
router.get('/user-profile/:id', function (req, res, next) {
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
            // do another query to get fave restaurants:
            const RestQuery = 'SELECT R.rid, R.name FROM Users U, FavRestaurant R WHERE U.uid = :uid and U.uid == R.uid;'
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
  
router.post('/user-profile/:id/edit', function (req, res, next) {
    const uid = req.params.id
    username = req.body.username
    password = req.body.password
    name = req.body.name
    img = req.body.img
    valid = true
    // check if this user even exists
    const queryUID = 'SELECT * FROM User WHERE uid = :uid;'
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
            const queryUsername = 'SELECT from User WHERE username = :username UNION SELECT from Owner WHERE username = :username;'
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
          if (img == '') {
              img = user[0].img
          }
          if (valid) { // can update user profile with new username or null
            const updateQuery = 'UPDATE Users SET username = :username, password = :password, name = :name, img = :img WHERE uid = :uid ;'
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
              res.send('user-profile/:id')  //TODO: is this right?
          } else { 
            // username already exists so return a fail
            res.send(false)
          }
        }
        else { 
            // user does not exist!!
            res.status(404).json({})
        }
    })
})

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
            const queryUsername = 'SELECT from User WHERE username = :username UNION SELECT from Owner WHERE username = :username;'
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
          if (img == '') {
              img = user[0].img
          }
          if (valid) { // can update user profile with new username or null
            const updateQuery = 'UPDATE Owner SET username = :username, password = :password, name = :name, img = :img WHERE oid = :oid ;'
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
              res.send('owner-profile/:id')  //TODO: is this right?
          } else { 
            // username already exists so return a fail
            res.send(false)
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