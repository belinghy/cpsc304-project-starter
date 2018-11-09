const ENTITIES = {
    user: {
        id: 123,
        name: 'rojin',
    },
    userProfile: {
        userId: 123,
        userName: 'rojin',
        userPassword: 'password',
        profilePicUrl: 'https://google.com/image',
        favRestaurants: [ ENTITIES.restaurantListItem ],
        // empty at first
        favFoods: [ ENTITIES.favFoodListItem ],
        // empty at first
        searches: [ ENTITIES.searchHistoryListItem ],
    },
    ownerProfile: {
        userId: 123,
        userName: 'rojin',
        userPassword: 'password',
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

    }
}

const REST_ENDPOINTS = {
    login: {
        type: 'POST',
        requestUrl: `${apiBasePath}/sections/${sectionId}/files`,
        body: {
            userName: 'foo',
            password: ''
        },
        response: {
            code: 200 | 500,
            body: ENTITIES.user
        }
    },
}
