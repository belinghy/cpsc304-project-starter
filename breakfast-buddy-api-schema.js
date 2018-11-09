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
