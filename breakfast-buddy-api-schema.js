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
        favRestaurants: [ ENTITIES.restaurantListItem ],
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
        ownedRestaurants: [ ENTITIES.restaurantListItem ]
    },
    restaurantListItem: {
        restaurantId: 123,
        name: 'dons bar and grill',
        isFavourited: true,
    },
    favFoodListItem: {
        restaurantId: 123,
        restaurantName: 'ihop',
        foodType: 'pancakes'
    },
    searchHistoryListItem: {

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
}

//user = {'id': u/oid, 'name': name, 'owner': owner}
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
            const query = 'SELECT * FROM Users U, FavRestaurant R WHERE U.uid = :uid and U.uid == R.uid;'
            connection.query(query,
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
                      'favRestaurants': restaurants[0], // TODO: fix the format of this
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
            const query = 'SELECT * FROM Owner O, Restaurant R WHERE O.oid = :oid and O.rid == R.rid;'
            connection.query(query,
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
                      'ownedRestaurants': restaurants[0] // TODO: fix the format of this
                    })
                })
        } else {
            res.status(404).json({})
        }
      })
})
  