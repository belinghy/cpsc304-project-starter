const REST_ENDPOINTS = {
    getSectionById: {
        requestUrl: `${apiBasePath}/sections/${sectionId}`,
        response: {
            code: 200 | 404,
            body: 'nothing',
        }
    },
    getChats: {
        requestUrl: `${apiBasePath}/sections/${sectionId}/chats?batchId=${batchId}`,
        response: {
            code: 200 | 400,
            body: {
                entities: {
                    chats: {
                        byId: {
                            chat1: {
                                id: 'chat1',
                                userId: 'user1',
                                timestamp: 123456789,
                                message: 'this is words',
                            },
                        },
                        allIds: ['chat1']
                    },
                    users: {
                        user1: {
                            id: 'user1',
                            screenName: 'foo',
                        }
                    },
                },
                meta: {
                    latestLoadedChatBatchId: 0,
                },
            },
        },
    },
    getFeedItems: {
        requestUrl: `${apiBasePath}/sections/${sectionId}/feedItems?batchId=${batchId}&queryCriteria=${queryCriteria}`,
        response: {
            code: 200 | 400,
            body: {
                entities: {
                    feedItems: {
                        byId: {
                            feedItem1: {
                                id: 'feedItem1',
                                type: 'question',
                                title: 'title1',
                                expandedFeedItemId: 'expandedFeedItem1',
                                userId: 'user1',
                            }
                        },
                        allIds: ['feedItem1'],
                    }
                },
                meta: {
                    latestLoadedFeedBatchId: 0,
                },
            },
        },
    },
    getExpandedFeedItem: {
        requestUrl: `${apiBasePath}/sections/${sectionId}/expandedFeedItems/${expandedFeedItemId}`,
        response: {
            code: 200 | 400,
            // Question | Resource
            body: {
                expandedFeedItem: 'expandedFeedItem1',
                entities: {
                    expandedFeedItems: {
                        expandedFeedItem1: {
                            id: 'expandedFeedItem1',
                            timestamp: 'timestring',
                            type: 'question',
                            title: 'what is a yamo?',
                            description: 'it is a cool thing',
                            userId: 'user1',
                            // NOTE: include empty array if no comments
                            commentIds: [
                                'comment1',
                            ],
                        }
                    },
                    // NOTE: don't include if expanded feed item's comments is empty
                    comments: {
                        comment1: {
                            id: 'comment1',
                            timestamp: 'timestring',
                            userId: 'user1',
                            netVotes: 14,
                            content: 'this is a comment.',
                            // NOTE: include empty array if no threads
                            threadIds: [
                                'thread1',
                            ],
                        }
                    },
                    // NOTE: don't include if expanded feed item's threads is empty
                    threads: {
                        thread1: {
                            id: 'thread1',
                            timestamp: 'timestring',
                            userId: 'user2',
                            content: 'this is a thread.',
                        }
                    },
                    users: {
                        user1: {
                            id: 'user1',
                            screenName: 'Anonymous Foo',
                        },
                        user2: {
                            id: 'user2',
                            screenName: 'Anonymous Bar',
                        },
                    },
                },
            },
            // Event
            body: {
                expandedFeedItem: 'expandedFeedItem2',
                entities: {
                    expandedFeedItems: {
                        expandedFeedItem2: {
                            id: 'expandedFeedItem2',
                            timestamp: 'timestring',
                            type: 'event',
                            title: 'Chapter 5 Midterm Study Session',
                            description: 'let us study',
                            userId: 'user1',
                            location: 'Sauder Room 491C',
                            startDateTime: 'Tue Jun 26 2018 05:03:55 GMT+0000',
                            endDateTime: 'Tue Jun 26 2018 06:03:55 GMT+0000',
                            maxAttendees: 5,
                            // NOTE: include empty array if no attendees
                            attendeeIds: [
                                'attendee1',
                            ],
                        }
                    },
                    // NOTE: don't include if expanded feed item's attendees is empty
                    attendees: {
                        attendee1: {
                            // NOTE: because we don't display anything about user
                            // we do not need to send associated user object
                            userId: 'user2',
                            enteredName: null || 'Riki Beazley',
                        },
                    },
                    users: {
                        user1: {
                            id: 'user1',
                            screenName: 'Anonymous Foo',
                        },
                    },
                },
            },
        },
    },
    postUpload: {
        requestUrl: `${apiBasePath}/sections/${sectionId}/files`,
        response: 200 | 500
    },
}
