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
        restaurantID = '234',
        restaurantName = 'Macs',
        OpenHours = [ENTITIES.HoursOfOpListItem],
        number = "293",
        street = "skj st",
        city = "ewfk",
        postalCode = "efqrf",
        lat = '3456345.34543',
        lon = '3434.34545',
        faveFood = '',
        food_types = [ENTITIES.FoodTypeListItem],
    },

    searchHistoryLocListItem: {
        sid = 23,
        street: 'blah st',
        city : 'sf',
        day: 'Mon',
        time: '12:00',
    },
    FoodTypeListItem: {
        food_type: 'eggs'
    },
    HoursOfOpListItem : {
        day: 'Monday',
        openTime: '00:00',
        closeTime: '24:00'
    },
    SearchResultListItem : {
        restaurantID: '32rf3-4r',
        restaurantName: 'blahhh',
        faveFood: "eggs",
        closeTime: '23'
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
            body: [ ENTITIES.searchHistoryLocListItem ]
        }
    },
    userDelLikedRestaurant : {
        type: 'Delete',
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
        } // Rojin: send empty array
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
        type: 'Delete',
        requestUrl: `${baseURL}/user/${id}/remove-fave-food/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: [ ENTITIES.favFoodListItem ]
        }
    },
    ownerDelOwnedRestaurant : {
        type: 'DELETE',
        requestUrl: `${baseURL}/owner/${oid}/remove-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            // FE should retain owner profile info and redirect to show owner profile with this new list of restaurants
            body: [ ENTITIES.RestaurantItem ] 
        }
    },
    viewRestaurant :{
        type: 'Get',
        requestUrl: `${baseURL}/view-restaurant/${rid}`,
        body: NULL,
        response: {
            code: 200 || 404,
            body: ENTITIES.expandedRestaurant
        }
    },
    ownerAddRestaurant :{  // TODO: assuming these required fields can be checked on FE?
        type: 'Post',
        requestUrl: `${baseURL}/${oid}/add-restaurant/`,
        body: {
            restaurantName = 'Macs', //required
            OpenHours = [ENTITIES.HoursOfOpListItem], //must contain at least one open time
            number = "293",         //required
            street = "skj st",      //required
            city = "ewfk",          //required
            postalCode = "efqrf",   //required
            lat = '34534.34545',     // calculated based on address given
            lon = '345.34545',
            food_types = [ENTITIES.FoodTypeListItem], // must contain at least one food
        },
        response: {
            code: 200 || 404 || 400, // get 400 when either of the required feilds are not provided OR if address belongs to another restaurant
            // FE should retain owner info and redirect to owner profile showing new list of restaurants
            body: [ENTITIES.RestaurantItem ]
        }
    },
    SearchForRestaurant :{
        type: 'POST',
        requestUrl: `${baseURL}/${id}/search-restaurant/`,
        body: {
            lat: '3243.2343',
            lon: '324.234',
            time: '12:00',
            day: 'Monday',
            city: 'vancouver',
            street: '4th ave'
        },
        response: {
            code: 200 || 404,
            body: [ENTITIES.SearchResultListItem]
        }
    },

    //TODO:    
    // user likes food at restaurant
    // user likes restaurant
    // guest user likes food at restaurnt

    // leave the rest
    ownerDelRestaurantTime :{ 
        type: 'delete',
        requestUrl: `${baseURL}/${oid}/del-time/${rid}`,
        body: { time: ENTITIES.HoursOfOpListItem},
        response: {
            code: 200 || 404,
            body: [ENTITIES.HoursOfOpListItem ] // FE redirect to expanded view and retain all restaurant info
        }
    },
    ownerAddRestaurantTime :{ 
        type: 'Post',
        requestUrl: `${baseURL}/${oid}/add-time/${rid}`,
        body: { time: ENTITIES.HoursOfOpListItem },
        response: {
            code: 200 || 404,
            body: [ENTITIES.HoursOfOpListItem ] // FE redirect to expanded view and retain all restaurant info
        }
    },
    ownerAddRestaurantFood :{ 
        type: 'Post',
        requestUrl: `${baseURL}/${oid}/add-food/${rid}`,
        body: { 
            food_types = [ENTITIES.FoodTypeListItem],  // can add multiple at a time
        },
        response: {
            code: 200 || 404,
            body: [ENTITIES.FoodTypeListItem ] // FE redirect to expanded view and retain all restaurant info
        }
    },
    ownerDelRestaurantFood :{ 
        type: 'DELETE',
        requestUrl: `${baseURL}/${oid}/del-food/${rid}`,
        body: { 
            food_type = 'eggs', 
        },
        response: {
            code: 200 || 404,
            body: [ENTITIES.FoodTypeListItem ] // FE redirect to expanded view and retain all restaurant info
        }
    },
    ownerUpdateRestaurantName :{
        type: 'Post',
        requestUrl: `${baseURL}/${oid}/update-name/${rid}`,
        body: {
            restaurantName = 'Macs' // if left blank will not update
        },
        response: {
            code: 200 || 404,
            body: name  // FE redirect to expanded view and retain all other restaurant info (foods and open hours)
        }
    },
    ownerUpdateRestaurantLoc :{
        type: 'Post',
        requestUrl: `${baseURL}/${oid}/update-loc/${rid}`,
        body: {  // reject update if any field left blank on FE
            number = "293",          //required
            street = "skj st",       //required
            city = "ewfk",          //required
            postalCode = "efqrf",   //required
        },
        response: {
            // FE: returns 400 to FE if all fields in body do not have values (so no update)
            code: 200 || 404 || 400, 
            body: { // FE redirect to expanded view and retain all other restaurant info (foods and open hours)
                number: 'newnum',
                street = 'newstreet',       
                city = "newcity",          
                postalCode = "newcode"
            } 
        }
    }
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
            const query2 = 'SELECT S.sid, S.day, S.openTime as time, L.street, L.city FROM SignedUpUser U, SignedUpUserLocationTimeSearches S, Location L WHERE U.uid = :uid and U.uid == S.uid and L.lat == S.lat and L.lon==S.lon;'
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

// Done
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

router.delete('/owner/:oid/remove-restaurant/:rid', function (req, res, next) {
    const oid = req.params.oid
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
                    faveFood = FaveFoodItem,
                    food_types = foods
                })
              })
            })
          })
        } else {
            res.status(404).json({})
        }
      })
})


router.post('/:oid/add-restaurant/', function (req, res, next) {
    const oid = req.params.oid
    const name = req.body.restaurantName
    const OpenHours = req.body.OpenHours
    const number = req.body.number
    const street = req.body.street
    const city = req.body.city
    const postalCode = req.body.postalCode
    const food_types = req.body.food_types
    const lat = req.body.lat
    const lon = req.body.lon
    const rid = uuidv1()
    const query1 = 'SELECT * from owner where oid=:oid;'
    connection.query(query1,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {oid: oid}
      })
      .then(owner => {
        if (owner.length === 1){
          if (OpenHours.length === 0 || food_types.length === 0){
            res.status(400).json({})
          } else {
          const query2 = 'INSERT INTO Restaurant (rid, name, oid) VALUES (:rid, :name, :oid);'
          connection.query(query2,
          {
            type: connection.QueryTypes.INSERT,
            replacements: {
                rid: rid,
                name: name,
                oid: oid
            }
          })
          const query3 = 'SELECT * FROM Location where lat = :lat and lon = :lon and rid NOT NULL;'
          connection.query(query3,
          {
            type: connection.QueryTypes.SELECT,
            replacements: {lat: lat, lon: lon}
          })
          .then(loc => {
              if (loc.length =! 0){
                res.status(400) // location belongs to some other restaurant so cant accept this!
              } else {
                const query4 = 'INSERT INTO Location (postalCode, lat, lon, city, street, number, rid) Values '+
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
              }
          })
          // indert hours of op
          for (t in OpenHours) {
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
          for (f in food_types) {
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
          const query9 = 'SELECT rid, name from Restaurant where oid=:oid;'
          connection.query(query9,
            {
              type: connection.QueryTypes.SELECT,
              replacements: {oid: oid}
            })
            .then(restaurants => {
                res.json(restaurants)
            })
        }} else {
            res.status(404).json({})
        }
      })
})














router.post('/:oid/update-name/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const name = req.body.restaurantName
    const query1 = 'SELECT * from Restaurant rid=:rid and oid=:oid;'
    connection.query(query1,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            if (name != ''){
                const query2 = 'UPDATE Restaurant SET name = :name where rid=:rid and oid=:oid;'
                connection.query(query2,
                  {
                    type: connection.QueryTypes.UPDATE,
                    replacements: {rid: rid, oid: oid, name: name}
                  })
            } else {
                name = restaurant[0].name
            }
            res.send(name)
        } else {
            res.status(404).json({}) 
        }
    })
})


router.post('/:oid/update-loc/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const number = req.body.number
    const street = req.body.street
    const city = req.body.city
    const postalCode = req.body.postalCode
    const query1 = 'SELECT * from Restaurant R, Location L where R.rid=:rid and R.rid=L.rid and R.oid=:oid;'
    connection.query(query1,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            if (postalCode != '' && city != '' && street != '' && number != ''){
                const query3 = 'UPDATE Location SET postalCode = :postalCode, lat= :lat, lon = :lon' + 
                                'city = :city, street = :street, number = :number where rid=:rid;'
                connection.query(query3,
                  {
                    type: connection.QueryTypes.UPDATE,
                    replacements: {
                        rid: rid,
                        lat: lat, // TODO: calc these based on address??
                        lon: lon,
                        city: city,
                        street: street,
                        number: number
                    }
                  })
                  res.json({
                    number = number,         
                    street = street,      
                    city = city,
                    postalCode = postalCode
                  })
            } else {
                res.status(400).json({})
            }
        } else {
            res.status(404).json({}) 
        }
    })
})

router.post('/:oid/add-food/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const foods = req.body.food_types
    const query = 'SELECT * FROM Restaurant WHERE oid = :oid and rid = :rid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            for (food in foods) {
                const query1 = 'INSERT INTO Food (food_type) VALUES (:food_type);'
                connection.query(query1,
                  {
                    type: connection.QueryTypes.INSERT,
                    replacements: {food_type: food.food_type}
                  })
                const query2 = 'INSERT INTO FoodsServedAtRestaurants (rid, food_type) VALUES (:rid, :food_type);'
                connection.query(query2,
                  {
                    type: connection.QueryTypes.INSERT,
                    replacements: {rid: rid, food_type: food.food_type}
                  })
            }
            const query3 = 'SELECT food_type from FoodsServedAtRestaurants where rid= :rid;'
            connection.query(query3,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then (newFoods => {
                  res.jason(newFoods)
              })
        } else {
            res.status(404).json({})
        }
      })
})


router.delete('/:oid/del-food/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const food = req.body.food_type
    const query = 'SELECT * FROM Restaurant WHERE oid = :oid and rid = :rid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            const query1 = 'DELETE FROM FoodsServedAtRestaurants where food_type = :food_type and rid= :rid;'
            connection.query(query1,
                {
                    type: connection.QueryTypes.DELETE,
                    replacements: {food_type: food, rid: rid}
                })
            const query3 = 'SELECT food_type from FoodsServedAtRestaurants where rid= :rid;'
            connection.query(query3,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then (newFoods => {
                  res.jason(newFoods)
              })
        } else {
            res.status(404).json({})
        }
      })
})

router.delete('/:oid/del-time/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const time = req.body.time
    const query = 'SELECT * FROM Restaurant WHERE oid = :oid and rid = :rid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            const query1 = 'DELETE FROM RestaurantHoursOfOperation where day = :day and openTime = :openTime and closeTime = :closeTime and rid= :rid;'
            connection.query(query1,
                {
                    type: connection.QueryTypes.DELETE,
                    replacements: {day: day, openTime: openTime, closeTime: closeTime, rid: rid}
                })
            const query3 = 'SELECT day, openTime, closeTime from RestaurantHoursOfOperation where rid= :rid;'
            connection.query(query3,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then (newHours => {
                  res.jason(newHours)
              })
        } else {
            res.status(404).json({})
        }
      })
})

router.post('/:oid/add-time/:rid', function (req, res, next) {
    const oid = req.params.oid
    const rid = req.params.rid
    const time = req.body.time
    const query = 'SELECT * FROM Restaurant WHERE oid = :oid and rid = :rid;'
    connection.query(query,
      {
        type: connection.QueryTypes.SELECT,
        replacements: {rid: rid, oid: oid}
      })
      .then(restaurant => {
        if (restaurant.length === 1){
            const query1 = 'INSERT INTO RestaurantHoursOfOperation (day, openTime, closeTime, rid) VALUES (:day, :openTime, :closeTime, :rid);'
            connection.query(query1,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {day: day, openTime: openTime, closeTime: closeTime, rid: rid}
                })
            const query3 = 'SELECT day, openTime, closeTime from RestaurantHoursOfOperation where rid= :rid;'
            connection.query(query3,
              {
                type: connection.QueryTypes.SELECT,
                replacements: {rid: rid}
              })
              .then (newHours => {
                  res.jason(newHours)
              })
        } else {
            res.status(404).json({})
        }
      })
})