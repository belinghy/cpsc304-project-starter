const ENTITIES = {
    user: {
        id: '123',
        name: 'rojin',
    },
    userProfile: {

    },
    owner: {


    },
    restaurantListItem: {
        restaurantID = 234,
        name: 'Macs',
        isFavourited = true,
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
