// Sample profile pictures
import bobProfilePic from './sampleUsersProfiles/bob_profile.png'
import aliceProfilePic from './sampleUsersProfiles/alice_profile.png'
import lindaProfilePic from './sampleUsersProfiles/linda_profile.png'
import oliverProfilePic from './sampleUsersProfiles/oliver_profile.png'
import oliviaProfilePic from './sampleUsersProfiles/olivia_profile.png'
import frankProfilePic from './sampleUsersProfiles/frank_profile.png'
// Sample media
import EiffelPic from './sampleChatsMedia/Eiffel.jpg'
import funnyVideo from './sampleChatsMedia/funnyVideo.mp4'
import recordingPreview from './sampleChatsMedia/recordingPreview.wav'
export function MessagesInfo() {
    return ({
        "bob123": {
            "alice123": [{
                recieved: false,
                type: "text",
                data: "How's France?",
                timeStamp: "24.4.2022, 17:20:33",
                file: ""
            },
            {
                recieved: true,
                type: "text",
                data: "It's great! We've already been at the Eiffel",
                timeStamp: "24.4.2022, 17:21:40",
                file: ""
            },
            {
                recieved: true,
                type: "picture",
                data: "",
                timeStamp: "24.4.2022, 17:22:08",
                file: EiffelPic
            },
            {
                recieved: false,
                type: "text",
                data: "Enjoy your trip!",
                timeStamp: "24.4.2022, 17:23:20",
                file: ""
            }],
            "oliver123": [{
                recieved: true,
                type: "text",
                data: "Check out this funny video",
                timeStamp: "24.4.2022, 16:10:20",
                file: ""
            }, {
                recieved: true,
                type: "video",
                data: "",
                timeStamp: "24.4.2022, 16:11:25",
                file: funnyVideo
            },
            {
                recieved: false,
                type: "text",
                data: "Ha ha ha",
                timeStamp: "24.4.2022, 16:15:25",
                file: ""
            }],
            "olivia123": [{
                recieved: false,
                type: "text",
                data: "I'll get to the office tomorrow at 11AM",
                timeStamp: "24.4.2022, 15:12:24",
                file: ""
            }, {
                recieved: true,
                type: "text",
                data: "Okay, arrive even later if you need to.",
                timeStamp: "24.4.2022, 15:15:16",
                file: ""
            }],
            "linda123": [{
                recieved: false,
                type: "text",
                data: "The package will be shipped out in 5-8 bussiness days.",
                timeStamp: "24.4.2022, 14:15:20",
                file: ""
            }, {
                recieved: true,
                type: "text",
                data: "Thanks.",
                timeStamp: "24.4.2022, 14:16:40",
                file: ""
            }
            ],
            "frank123": [{
                recieved: false,
                type: "text",
                data: "Hi, I would like to apply for the recording job",
                timeStamp: "24.4.2022, 13:44:54",
                file: ""
            }, {
                recieved: true,
                type: "text",
                data: "No problem, we can schedule an interview for tomorrow at 3:00PM.",
                timeStamp: "24.4.2022, 13:45:30",
                file: ""
            },
            {
                recieved: false,
                type: "text",
                data: "Sounds great.",
                timeStamp: "24.4.2022, 13:46:45",
                file: ""
            },
            {
                recieved: true,
                type: "text",
                data: "Please send us a sample recording of your voice before the interview.",
                timeStamp: "24.4.2022, 13:48:20",
                file: ""
            },
            {
                recieved: false,
                type: "record",
                data: "",
                timeStamp: "24.4.2022, 13:50:18",
                file: recordingPreview
            },
            {
                recieved: true,
                type: "text",
                data: "Thanks",
                timeStamp: "24.4.2022, 13:52:20",
                file: ""
            }]
        },
        "alice123": {
            "bob123": [{
                recieved: true,
                type: "text",
                data: "How's France?",
                timeStamp: "24.4.2022, 17:20:33",
                file: ""
            },
            {
                recieved: false,
                type: "text",
                data: "It's great! We've already been at the Eiffel",
                timeStamp: "24.4.2022, 17:21:40",
                file: ""
            },
            {
                recieved: false,
                type: "picture",
                data: "",
                timeStamp: "24.4.2022, 17:22:08",
                file: EiffelPic
            },
            {
                recieved: true,
                type: "text",
                data: "Enjoy your trip!",
                timeStamp: "24.4.2022, 17:23:20",
                file: ""
            }],
            "oliver123": [],
            "olivia123": [],
            "linda123": [],
            "frank123": []
        },
        "oliver123": {
            "bob123": [{
                recieved: false,
                type: "text",
                data: "Check out this funny video",
                timeStamp: "24.4.2022, 16:10:20",
                file: ""
            }, {
                recieved: false,
                type: "video",
                data: "",
                timeStamp: "24.4.2022, 16:11:25",
                file: funnyVideo
            },
            {
                recieved: true,
                type: "text",
                data: "Ha ha ha",
                timeStamp: "24.4.2022, 16:15:25",
                file: ""
            }],
            "alice123": [],
            "olivia123": [],
            "linda123": [],
            "frank123": []
        },
        "olivia123": {
            "bob123": [{
                recieved: true,
                type: "text",
                data: "I'll get to the office tomorrow at 11AM",
                timeStamp: "24.4.2022, 15:12:24",
                file: ""
            }, {
                recieved: false,
                type: "text",
                data: "Okay, arrive even later if you need to.",
                timeStamp: "24.4.2022, 15:15:16",
                file: ""
            }],
            "alice123": [],
            "oliver123": [],
            "linda123": [],
            "frank123": []
        },
        "linda123": {
            "bob123": [{
                recieved: true,
                type: "text",
                data: "The package will be shipped out in 5-8 bussiness days.",
                timeStamp: "24.4.2022, 14:15:20",
                file: ""
            }, {
                recieved: false,
                type: "text",
                data: "Thanks.",
                timeStamp: "24.4.2022, 14:16:40",
                file: ""
            }],
            "alice123": [],
            "oliver123": [],
            "olivia123": [],
            "linda123": [],
            "frank123": []
        },
        "frank123": {
            "bob123": [{
                recieved: true,
                type: "text",
                data: "Hi, I would like to apply for the recording job",
                timeStamp: "24.4.2022, 13:44:54",
                file: ""
            }, {
                recieved: false,
                type: "text",
                data: "No problem, we can schedule an interview for tomorrow at 3:00PM.",
                timeStamp: "24.4.2022, 13:45:30",
                file: ""
            },
            {
                recieved: true,
                type: "text",
                data: "Sounds great.",
                timeStamp: "24.4.2022, 13:46:45",
                file: ""
            },
            {
                recieved: false,
                type: "text",
                data: "Please send us a sample recording of your voice before the interview.",
                timeStamp: "24.4.2022, 13:48:20",
                file: ""
            },
            {
                recieved: true,
                type: "record",
                data: "",
                timeStamp: "24.4.2022, 13:50:18",
                file: recordingPreview
            },
            {
                recieved: false,
                type: "text",
                data: "Thanks",
                timeStamp: "24.4.2022, 13:52:20",
                file: ""
            }],
            "alice123": [],
            "oliver123": [],
            "olivia123": [],
            "linda123": []
        }
    }
    );
}
export function UsersInfo() {
    return ({
        "alice123": {
            nickName: "Alice",
            password: "alice_pass",
            profile: aliceProfilePic,
            friends: ["bob123"]
        },
        "bob123": {
            nickName: "Bob",
            password: "bob_pass",
            profile: bobProfilePic,
            friends: ["alice123", "oliver123", "olivia123", "linda123", "frank123"]
        },
        "olivia123": {
            nickName: "Olivia",
            password: "olivia_pass",
            profile: oliviaProfilePic,
            friends: ["bob123"]
        },
        "oliver123": {
            nickName: "Oliver",
            password: "oliver_pass",
            profile: oliverProfilePic,
            friends: ["bob123"]
        },
        "linda123": {
            nickName: "Linda",
            password: "linda_pass",
            profile: lindaProfilePic,
            friends: ["bob123"]
        },
        "frank123": {
            nickName: "Frank",
            password: "frank_pass",
            profile: frankProfilePic,
            friends: ["bob123"]
        }
    }
    );
}
