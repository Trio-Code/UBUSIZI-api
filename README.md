# UBUSIZI API

## INSTALLATION

### Installing Dependencies

Run
`yarn install` or `npm i`

### .env

Create a .env file in the root directory and paste in this

```
MONGO_URI=
JWT_SECRET=
SMTP_PASS=
SMTP_USER=
SMTP_HOST=
SMTP_PORT=
HOST=
AWS_KEY_ID=
AWS_KEY_SECRET=
AWS_S3_REGION=
```

## Routes Menu

### Admin

- [Admin Login](#1-admin-login-post-request)

### User

- [User Signup](#2-user-signup-post-request)
- [User Login](#3-user-login-post-request)
- [User Account verification](#4-user-account-verification-put-request)
- [User Social Login](#5-user-social-login-post-request)
- [User Fetch Profile](#6-user-fetch-profile-get-request)
- [User Change Password](#7-user-change-password-put-request)
- [User Reset Password](#8-user-reset-password-post-request)
- [User Create New Password](#9-user-create-new-password-put-request)
- [User Remove Profile Picture](#10-user-remove-profile-picture-put-request)
- [user Update Profile](#11-User-Update-Profile-Put-Request)
- [User Update Profile Picture](#14-User-Update-Profile-Picture-Put-Request)
- [User Delete Their Posts](#-19-User-Delete-post-Delete-Request)

### Post

- [Add New Post](#12-add-new-post-post-request)
- [Fetch All Posts](#13-fetch-all-posts-get-request)
- [User Like Posts](#17-user-like-post-put-request)
- [User Unlike Posts](#20-user-unlike-post-put-request)
- [User Fecth Own Post](#16-User-fetch-own-posts-Get-Request)
- [User Fetch Single Post](#21-user-fetch-single-post-get-request)
- [Fetch Recent Posts](#49-fetch-recent-posts-get-request)

### Comment

- [Add New Comment](#15-add-new-comment-post-request)
- [User Remove own Comment](#18-user-remove-own-comment-delete-request)

### Follow

- [User Follow Each Other](#22-user-follow-each-other-put-request)
- [User Fetch Followers](#23-user-fetch-followers-get-request)
- [User Unfollow Each Other](#24-user-unfollow-each-other-put-request)
- [User Fetch Following](#26-user-fetch-following-get-request)

### Like

- [User Like Posts](#17-user-like-post-put-request)
- [User unLike Posts](#20-user-unlike-post-put-request)

### Report

- [User Report an Account](#27-user-report-an-account-post-request)
- [User Report a Post](#28-user-report-a-post-post-request)
- [Admin Fetch Reported Accounts](#30-admin-fetch-reported-accounts-Get-request)
- [Admin Fetch Reported posts](#34-admin-fetch-reported-posts-Get-request)

### Search

- [User search account](#29-user-search-account-get-request)

### Poets Verification

- [Poet Request Verification](#35-poet-request-verification-post-request)
- [Fetch All Poet Requests Verificatio](#36-fetch-all-poet-requests-verification-get-request)
- [Approve Poet Verification Request](#37-Approve-Requests-Verification-Put-Request)

### Category

- [Add New Category](#38-add-new-category-post-request)
- [Update Category](#47-update-category-put-request)
- [Admin fetch all categories](#48-admin-fetch-all-categories-get-request)

### Color

- [Admin Add New Color](#39-admin-add-new-color-post-request)
- [Admin Fetch All Colors](#40-admin-fetch-all-colors-get-request)
- [Admin Fetch Single Color](#41-admin-fetch-single-color-get-request)
- [Admin Update Color](#42-admin-update-color-put-request)

### Font

- [Admin Add New Font](#43-admin-add-new-font-post-request)
- [Admin Fetch All Fonts](#44-admin-fetch-all-fonts-get-request)
- [Admin Fetch Single Font](#45-admin-fetch-single-font-get-request)
- [Admin Update Font](#46-admin-update-font-put-request)

### Suggestions

- [Suggestions](#50-suggestions-get-request)

### Activity

-[Activity](#51-activity-get-request)
### 1. Admin Login: POST Request

End Point

```
/api/v1/admin/login
```

Body

```json
{
    "username":"hdidiersharif@gmail.com",
    "password":"sheezy7"
}


Response
```json
{
    "status": 200,
    "message": "Logged in successfully",
    "data": {
        "username": "hdidiersharif@gmail.com",
        "role": "admin",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhkaWRpZXJzaGFyaWZAZ21haWwuY29tIiwicGFzc3dvcmQiOiJzaGVlenk3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAxMjc3NTEwfQ.jeK1QC4FDU21-UHq9j9UpjXUg9KCgi30Gm2RDLj-yl0"
    }
}
```

### 2. User Signup: POST Request

End Point

```
/api/v1/users/signup
```

Body

```json
{
    "firstname": "Ahirwe",
    "lastname": "Mugisha Tresor",
    "email": "ahirwemtresor9@gmail.com",
    "username": "_tresor.53",
    "password": "tresor53"
}
Response
```json
{
    "status": 201,
    "message": "Signed up successfully",
    "data": {
        "profilePicture": "none",
        "isVerified": "false",
        "bio": "**No Biography**",
        "_id": "5f7adb1407541c23681697dd",
        "firstname": "Ahirwe",
        "lastname": "Mugisha Tresor",
        "email": "ahirwemtresor9@gmail.com",
        "username": "tresor53",
        "createdAt": 1601882486968,
        "__v": 0
    }
}
```

### 3. User login: POST Request

End Point

```
/api/v1/users/login
```

Body

```json
{
"account":"arseneich@gmail.com",
"password":"muhanga"
}

Response
```json
{
    "status": 200,
    "message": "Logged in successfully",
    "data": {
        "isVerified": "true",
        "bio": "**No Biography**",
        "_id": "5f733bd58ebae0059c4fdc23",
        "username": "kalisa11",
        "firstname": "leo",
        "email": "arseneich@gmail.com",
        "lastname": "kalisa",
        "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/ddb44212-b745-46ee-bc12-5f6b932cd535.JPG",
        "createdAt": 1601387477129,
        "__v": 0
    }
}
```

### 4. User Account Verification: PUT Request

End Point

```
/api/v1/users/verify-account?token=eyJhbGciOiJIUzI1NiJ9.YXJzZW5laWNoQGdtYWlsLmNvbQ.YJ_Yv1e0RBHctvhn5CLuIP6GvmKwAIsq6TwzksOmcco
```

Response

```json
{
  "status": 200,
  "message": "Account verified succefully, now you can login",
  "data": {
    "isVerified": "true",
    "bio": "**No Biography**",
    "_id": "5f733bd58ebae0059c4fdc23",
    "username": "kalisa11",
    "firstname": "leo",
    "email": "arseneich@gmail.com",
    "lastname": "kalisa",
    "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/ddb44212-b745-46ee-bc12-5f6b932cd535.JPG",
    "createdAt": 1601387477129,
    "__v": 0
  }
}
```

### 5. User social login: POST Request

End Point

```
/api/v1/users/social-login
```

Body

```json
{
    "firstname":"marcus",
    "lastname":"rashford",
    "email":"rashford@gmail.com"
}

Response
```json
{
    "status": 200,
    "message": "Logged in successfully ",
    "data": {
        "isVerified": "true",
        "_id": "5f7380d54050331970639f0c",
        "bio": "**No Biography**",
        "firstname": "marcus",
        "lastname": "rashford",
        "email": "rashford@gmail.com",
        "username": "marcusrashford32701",
        "createdAt": 1601405141879,
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhc2hmb3JkQGdtYWlsLmNvbSIsImlkIjoiNWY3MzgwZDU0MDUwMzMxOTcwNjM5ZjBjIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDE0MDUxNDZ9.4O2SOQgLsNuI84YFdrdQFRUykpM66YIrpVTvXgIi9LE"
    }
}
```

### 6. User Fetch Profile: GET Request

End Point

```
/api/v1/users/:username
```

Response

```json
{
  "status": 200,
  "message": "Fetched User Profile",
  "data": {
    "profilePicture": "none",
    "isVerified": "true",
    "bio": "**No Biography**",
    "_id": "5f818f1f072c7823d4d32c76",
    "firstname": "kenny",
    "lastname": "ruzindana",
    "email": "kenny@gmail.com",
    "username": "kennyruzindana1423",
    "createdAt": "2020-10-10T10:38:23.400Z",
    "__v": 0,
    "totalposts": 1,
    "followers": 2,
    "following": 1,
    "isFollowing": true,
    "posts": [
      {
        "_id": "5f8359f8cda63a06c85c895f",
        "type": "Text",
        "caption": "My little design",
        "color": {
          "_id": "5fb3e29ab67fb21e6cc47661",
          "colorName": "blue"
        },
        "content": "U Rwanda rwa gasabo",
        "font": {
          "_id": "5fb3d81507594c01f83c4d28",
          "fontName": "roman"
        },
        "owner": "5f818f1f072c7823d4d32c76",
        "createdAt": 1602443768055,
        "__v": 0,
        "isLiked": true,
        "totalLikes": 2,
        "totalComments": 0,
        "likes": [
          {
            "_id": "5f8359fdcda63a06c85c8960",
            "user": {
              "profilePicture": "none",
              "_id": "5f818ef3072c7823d4d32c74",
              "username": "marcusrashford4710",
              "isFollowing": false
            }
          },
          {
            "_id": "5f8359fdcda63a06c85c8960",
            "user": {
              "profilePicture": "none",
              "_id": "5f86d08e6203491570afe8f9",
              "username": "alextelles3150",
              "isFollowing": true
            }
          }
        ],
        "comments": []
      }
    ],
    "isUser": false
  }
}
```

### 7. User Change Password: PUT Request

End Point

```
/api/v1/users/update/change-password
```

Body

```json
{
    "oldPassword":"muhanga",
    "newPassword":"native",
}

Response
```json
{
    "status": 200,
    "message": "Password updated successfully",
    "data": {
        "isVerified": "true",
        "bio": "**No Biography**",
        "_id": "5f733bd58ebae0059c4fdc23",
        "username": "kalisa11",
        "firstname": "leo",
        "email": "arseneich@gmail.com",
        "lastname": "kalisa",
        "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/ddb44212-b745-46ee-bc12-5f6b932cd535.JPG",
        "createdAt": 1601387477129,
        "__v": 0
    }
}
```

### 8. User Reset Password: POST Request

End Point

```
/api/v1/users/reset-password
```

Body

```json
{
    "account": "kalisa11"
}

Response
```json
{
    "status": 200,
    "message": "User found, go and check the link in your email."
}
```

### 9. User Create New Password: PUT Request

End Point

```
/api/v1/users/new-password?token=eyJhbGciOiJIUzI1NiJ9.YWhpcndlbXVnaXNoYXQ1M0BnbWFpbC5jb20.MCfDR5lzHjtQjUFSyE34HsmgEJ2yarVp_dllLe7qUXY
```

Body

```json
{
    "password": "tresor12345"
}

Response
```json
{
    "status": 200,
    "message": "Password was reset successfully"
}
```

### 10. User Remove Profile Picture: PUT Request

End Point

```
/api/v1/users/update/remove-photo
```

Response

```json
{
  "status": 200,
  "message": "Profile Picture Removed"
}
```

### 11. User Update Profile: Put Request

End Point

```
/api/v1/users/update/edit-profile
```

Body

```json
{
    "bio": "Jesus Take The Wheel"
}
Response
```json
{
    "status": 200,
    "message": "User Profile Updated",
    "data": {
        "profilePicture": "none",
        "isVerified": "true",
        "bio": "Jesus Take The Wheel",
        "_id": "5f7c20bfb78c041c1cefeecf",
        "createdAt": "2020-10-06T07:42:17.817Z",
        "firstname": "Jovite",
        "lastname": "Ngoga",
        "email": "kzngoga19@gmail.com",
        "username": "kzngoga19",
        "__v": 0
    }
}
```

### 12. Add New Post: POST Request

End Point

```
/api/v1/posts/new
```

Body:
![Capture](https://user-images.githubusercontent.com/69919129/99413985-07f1f100-28ff-11eb-8abf-2227a6d855cb.JPG)
Response

```json
{
    "status": 201,
    "message": "Poem added successfully!",
    "data": {
        "_id": "5fb3eb93eaf83d05a0ebd7ae",
        "type": "Text",
        "color": "5fb3e29ab67fb21e6cc47661",
        "content": "this is david the gea",
        "font": "5fb3d81507594c01f83c4d28",
        "owner": "5fb3eaa5eaf83d05a0ebd7ab",
        "createdAt": 1605626771870,
        "__v": 0
    }
}
```

### 13. Fetch All Posts: Get Request

End Point

```
/api/v1/posts/all?page=1&limit=10
```

Response

```json
{
    "status": 200,
    "message": "Posts",
    "data": [
        {
            "_id": "5f8214ff73f70020dc1c0857",
            "type": "Text",
            "caption": "My poem ",
            "color": {
                "_id": "5fb3e29ab67fb21e6cc47661",
                "colorName": "blue"
            },
            "content": "U Rwanda rwa gasabo",
            "font": {
                "_id": "5fb3d81507594c01f83c4d28",
                "fontName": "roman"
            },
            "owner": null,
            "createdAt": 1602360575112,
            "__v": 0,
            "isLiked": false,
            "likes": "none",
            "likesNo": 0,
            "comments": [
                {
                    "_id": "5fa8fc9090e7451c646a47e9",
                    "comment": "Komereza aho",
                    "user": {
                        "profilePicture": "none",
                        "_id": "5fa5a5250cff0b2be0f900f4",
                        "username": "_tresor.53"
                    },
                    "post": "5f8214ff73f70020dc1c0857",
                    "createdAt": 1604910224709,
                    "__v": 0
                }
            ],
            "commentsNo": 1
        },
    ]
}
```

### 14. User Update Profile Picture: Put Request

End Point

```
/api/v1/users/update/change-photo
```

Body:
![image](https://user-images.githubusercontent.com/67208024/94787906-32c9c980-03d3-11eb-87d4-6f62479eab01.png)

Response

```json
{
  "status": 200,
  "message": "User Profile Picture Updated",
  "data": {
    "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/b1c5cf63-0830-4f53-af92-ab86949d2614.jpg",
    "isVerified": "true",
    "bio": "**No Biography**",
    "_id": "5f7584b7d826681a2c862fcc",
    "username": "kabish",
    "firstname": "kabish",
    "lastname": "mubicyane",
    "email": "wizzysharifivk@gmail.com",
    "createdAt": 1601537207743,
    "__v": 0
  }
}
```

### 15. Add New Comment: POST Request

Endpoint

```
/api/v1/comments/new/5f75b4fb4af6e51438f13d67
```

Body

```json
{
    "comment": "Nice poem, so helpful"
}

Response
```json
{
    "status": 201,
    "message": "Comment created successfully",
    "data": {
        "_id": "5f7717f676e6df3028cec117",
        "comment": "Nice poem, so helpful",
        "user": "5f74a6b9550dde016c879443",
        "post": "5f75b4fb4af6e51438f13d67",
        "__v": 0
    }
}
```

### 16. User fetch own posts: Get Request

```
/api/v1/posts/my-posts
```

Response

```json
{
  "status": 200,
  "message": "Posts",
  "data": [
    {
      "_id": "5f7d95f5099e602ae8fd8d70",
      "type": "Text",
      "color": {
        "_id": "5fb3e29ab67fb21e6cc47661",
        "colorName": "blue"
      },
      "content": "U Rwanda rwa gasabo",
      "font": {
        "_id": "5fb3d81507594c01f83c4d28",
        "fontName": "roman"
      },
      "caption": "Ibyiza bitatse u Rwanda",
      "color": "Red",
      "owner": "5f7d8c2b0736ab2e047e99d7",
      "createdAt": 1602065909622,
      "__v": 0,
      "isLiked": true,
      "likes": [
        {
          "_id": "5f7d95f5099e602ae8fd8d71",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8c2b0736ab2e047e99d7",
            "username": "kennylazer"
          }
        }
      ],
      "comments": [
        {
          "_id": "5f7da89608e4fe34c870c09b",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8c2b0736ab2e047e99d7",
            "username": "kennylazer"
          },
          "comment": "Good",
          "createdAt": 1604910224709
        }
      ]
    },
    {
      "_id": "5f7d95c2099e602ae8fd8d6e",
      "type": "Text",
      "content": "Rwanda Nziza",
      "caption": "Indirimbo y'igihugu cyacu",
      "color": "Red",
      "owner": "5f7d8c2b0736ab2e047e99d7",
      "createdAt": 1602065858243,
      "__v": 0,
      "isLiked": true,
      "likes": [
        {
          "_id": "5f7d95c3099e602ae8fd8d6f",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8c2b0736ab2e047e99d7",
            "username": "kennylazer"
          }
        }
      ],
      "comments": []
    },
    {
      "_id": "5f7f14d789b83a31708c0d80",
      "type": "Text",
      "content": "U Rwanda rwa Gasabo",
      "caption": "Ibyiza bitatse u Rwanda",
      "color": "Red",
      "owner": "5f7d8c2b0736ab2e047e99d7",
      "createdAt": 1602163927257,
      "__v": 0,
      "isLiked": false,
      "likes": [
        {
          "_id": "5f7f14d789b83a31708c0d81",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8d450736ab2e047e99d9",
            "username": "kennylazer2088"
          }
        }
      ],
      "comments": [
        {
          "_id": "5f7f154e89b83a31708c0d82",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8d450736ab2e047e99d9",
            "username": "kennylazer2088"
          },
          "comment": "Good",
          "createdAt": 1604910224709
        },
        {
          "_id": "5f7f154f89b83a31708c0d83",
          "user": {
            "profilePicture": "none",
            "_id": "5f7d8d450736ab2e047e99d9",
            "username": "kennylazer2088"
          },
          "comment": "Good",
          "createdAt": 1604910224709
        }
      ]
    }
  ]
}
```

### 17. User like post: put Request

```
/api/v1/likes/new/5f7759f775d9670f486fda2a
```

Response

```json
{
  "status": 200,
  "message": "Like successful"
}
```

### 18. User remove own comment: Delete Request

```
/api/v1/comments/delete/5f799eb63d8fa619200b20ec

```

Response

```json
{
  "status": 200,
  "message": "Comment Deleted Successfully"
}
```

### 19. User Delete post: Delete Request

```
/api/v1/posts/delete/5f76faf6f710051520387128
```

Response

```json
{
  "status": 200,
  "message": "Post Deleted Successfully"
}
```

### 20. User unlike post: put Request

Endpoint

```
/api/v1/likes/unlike/5f7af3fb12649518c85fc0d7
```

Response

```json
{
  "status": 200,
  "message": "Unlike successful"
}
```

### 21. User Fetch Single Post: Get Request

```
Endpoint
```

/api/v1/posts/single/5f7d8db7c00f8c3350875f8e

Response

```json
{
  "status": 200,
  "message": "Post fetched",
  "data": {
    "_id": "5f7d8db7c00f8c3350875f8e",
    "type": "Image",
    "caption": "My poem one of the good ones",
    "color": {
      "_id": "5fb3e29ab67fb21e6cc47661",
      "colorName": "blue"
    },
    "content": "U Rwanda rwa gasabo",
    "font": {
      "_id": "5fb3d81507594c01f83c4d28",
      "fontName": "roman"
    },
    "owner": "5f74a6b9550dde016c879443",
    "createdAt": 1602063799995,
    "__v": 0,
    "commentsNo": 1,
    "comments": [
      {
        "_id": "5f7d8decc00f8c3350875f90",
        "comment": "fresh sana!",
        "user": {
          "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/fef85df7-859b-4b27-b...",
          "_id": "5f74a6b9550dde016c879443",
          "username": "__tresor.53"
        },
        "post": "5f7d8db7c00f8c3350875f8e",
        "createdAt": 1604910224709,
        "__v": 0
      }
    ],
    "isLiked": "true",
    "likesNo": 1,
    "likes": [
      {
        "likes": ["5f74a6b9550dde016c879443"],
        "_id": "5f7d8db8c00f8c3350875f8f",
        "post": "5f7d8db7c00f8c3350875f8e",
        "__v": 0
      }
    ]
  }
}
```

### 22. User Follow Each Other: put Request

Endpoint

```
/api/v1/users/:id/follow
```

Response

```json
{
  "status": 200,
  "message": "User followed successfully"
}
```

### 23. User Fetch Followers: get Request

Endpoint

```
/api/v1/users/:id/followers
```

Response

```json
{
  "status": 200,
  "message": " All Followers ",
  "data": [
    {
      "profilePicture": "none",
      "_id": "5f7d7a1e9b4d151ab821f27d",
      "username": "edisoncavani1391"
    },
    {
      "profilePicture": "none",
      "_id": "5f7d7a499b4d151ab821f27f",
      "username": "marcusrashford3842"
    }
  ]
}
```

### 24. User Unfollow Each Other: PUT Request

Endpoint

```
/api/v1/users/:id/unfollow
```

Response

```json
{
  "status": 200,
  "message": "User unfollowed successfully"
}
```

### 26. User Fetch Following: Get Request

EndPoint

```
/api/v1/users/:id/following
```

Response

```json
{
  "message": "The people you follow",
  "data": [
    {
      "profilePicture": "none",
      "_id": "5f7ece8889d3101a6462c9b6",
      "username": "marcusrashford425"
    },
    {
      "profilePicture": "none",
      "_id": "5f7ecf2b89d3101a6462c9ba",
      "username": "ahirwetresor8611"
    }
  ]
}
```

### 27. User Report An Account: Post Request

EndPoint

```
/api/v1/users/:id/report
```

Body

```json
{
    "reason": "The account posts illegal content"
}
Response
```json
{
    "status": 201,
    "message": "Account reported successfully!",
    "data": {
        "_id": "5f7eebaa91e9102fa88a2426",
        "reason": "The account posts illegal content",
        "reporter": "5f7eceb489d3101a6462c9b8",
        "account": "5f7ece8889d3101a6462c9b6",
        "__v": 0
    }
}
```

### 28. User Report a Post: POST Request

EndPoint

```
/api/v1/posts/:id/report
```

Body

```json
{
    "reason": "Uyu musore yakoresheje ifoto mbi pe, Ihumura nabi!!"
}
Response
```json
{
    "status": 201,
    "message": "Post Reported",
    "data": {
        "_id": "5f8a39e0dbc9a31adc53de53",
        "reason": "The account posts illegal content",
        "reporter": "5f818ef3072c7823d4d32c74",
        "post": "5f8359f8cda63a06c85c895f",
        "owner": "5f818f1f072c7823d4d32c76",
        "__v": 0
    }
}
```

### 29. User search account: GET Request

EndPoint

```
/api/v1/search/user?q=merci&page=1&limit=10
```

Response

```json
{
  "status": 200,
  "message": "Results Retrieved",
  "data": [
    {
      "profilePicture": "none",
      "isVerified": "true",
      "bio": "**No Biography**",
      "_id": "5f7d81d5a05c211a686e9fb7",
      "email": "arsenemerci@gmail.com",
      "username": "eich3",
      "fullname": "arsene merci"
    }
  ]
}
```

### 30. Admin fetch reported accounts: Get Request

EndPoint

```
/api/v1/reports/accounts
```

Response

```json
{
  "status": 200,
  "message": "All reported Accounts",
  "data": [
    {
      "_id": "5f7f3ccfd30ebd1a485d0ab9",
      "reason": "The account posts illegal content",
      "reporter": {
        "profilePicture": "none",
        "_id": "5f7e031e5da6a62164291133",
        "username": "marcusrashford8731"
      },
      "account": {
        "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/6ddc8741-1b11-447e-a44e-c3eaeaa55b03.JPG",
        "_id": "5f76d1051606c307c4fd4f82",
        "username": "sharif"
      },
      "__v": 0
    }
  ]
}
```

### 34. Admin fetch reported posts: Get Request

EndPoint

```
/api/v1/reports/posts
```

Response

```json
{
  "status": 200,
  "message": "Post Reported",
  "data": [
    {
      "_id": "5f8a39e0dbc9a31adc53de53",
      "reason": "The account posts illegal content",
      "reporter": {
        "profilePicture": "none",
        "_id": "5f818ef3072c7823d4d32c74",
        "username": "marcusrashford4710"
      },
      "post": {
        "_id": "5f8359f8cda63a06c85c895f",
        "content": "we are reds"
      },
      "owner": {
        "profilePicture": "none",
        "_id": "5f818f1f072c7823d4d32c76",
        "username": "kennyruzindana1423"
      },
      "__v": 0
    }
  ]
}
```

### 35. Poet Request Verification: POST Request

End Point

```
/api/v1/verifications/request
```

Body:
![Request](https://user-images.githubusercontent.com/69919129/98364672-10385b00-1fe6-11eb-82c8-fce786f5b469.png)
Response

```json
{
  "status": 201,
  "message": "Request sent successfully!",
  "data": {
    "contents": [
      "https://ubusizi-posts.s3.us-east-2.amazonaws.com/3fa57b15-ded0-44f4-aa68-473f59dbdb38.docx",
      "https://ubusizi-posts.s3.us-east-2.amazonaws.com/287ee4b3-67ab-4f36-a6e3-633686199cc6.jpg",
      "https://ubusizi-posts.s3.us-east-2.amazonaws.com/dc0fa77e-c209-4648-81c6-ef4e7ae80905.jpg"
    ],
    "_id": "5fa5288087ee0520f4b42623",
    "reason": "ninjye bavuze usiga ntibasiganuze",
    "user": "5fa58970cf349717e0c622d7",
    "recommendation": [
      {
        "_id": "5fa5288087ee0520f4b42624",
        "name": "arsene",
        "email": "arsene@gmail.com",
        "telephone": "0788888888"
      },
      {
        "_id": "5fa5288087ee0520f4b42625",
        "name": "merci",
        "email": "merci@gmail.com",
        "telephone": "0799999999"
      }
    ],
    "__v": 0
  }
}
```


### 36. Fetch All Poet Requests Verification: Get Request

EndPoint

```
/api/v1/verifications/requests/all
```

Response

```json
{
    "status": 200,
    "message": "All requests fetched",
    "data": [
        {
          "contents": [
              "https://ubusizi-posts.s3.us-east-2.amazonaws.com/d06715d0-1c64-4b2a-873b-1df8384e1e0d.jpg",
              "https://ubusizi-posts.s3.us-east-2.amazonaws.com/951b7f88-65d5-4bef-a657-ad0bd6d87a63.jpeg",
              "https://ubusizi-posts.s3.us-east-2.amazonaws.com/6a23e359-7713-470f-84b6-cb402087498d.docx"
          ],
          "_id": "5fa58bd1d561c315b8a54b30",
          "reason": "Kuri iyi si bambiye ko nta musizi nkange wana",
          "user": {
              "profilePicture": "none",
              "_id": "5f906f328a6e85002f587b94",
              "firstname": "Miguel",
              "lastname": "Di Branco",
              "email": "migbranco16@gmail.com",
              "username": "migbranco"
          },
          "recommendation": [
              {
                  "_id": "5fa58bd1d561c315b8a54b31",
                  "name": "Jean Jacques Mwuate",
                  "email": "jeanm@yahoo.fr",
                  "telephone": "0734567800"
              },
              {
                  "_id": "5fa58bd1d561c315b8a54b32",
                  "name": "Vumilia Pelagie",
                  "email": "vumipela@hotmail.nl",
                  "telephone": "0734567800"
              }
          ],
          "createdAt": "2020-11-06T17:45:53.102Z",
          "__v": 0
        }
    ]
}
```
### 37. Approve Requests Verification: Put Request
EndPoint

```
/api/v1/verifications/request/5fa843c4bedd6715f803fd1b/approve
```

Response

```json
{
    "status": 200,
    "message": "Accout has been approved Successfully",
    "data": {
        "profilePicture": "none",
        "isVerified": "true",
        "isPoet": "true",
        "bio": "**No Biography**",
        "_id": "5fa843c4bedd6715f803fd1b",
        "firstname": "wizzy",
        "lastname": "Mugisha Tresor",
        "email": "wizzysharifiiif@gmail.com",
        "username": "tresor5",
        "createdAt": "2020-11-08T19:15:16.578Z",
        "__v": 0
    }
}
```
### 38. Add New Category: POST Request

End Point

```
/api/v1/category/new
```

Body:
![Capture](https://user-images.githubusercontent.com/69919129/99241403-7f902500-2806-11eb-8dd3-fd6592240cbc.JPG)
Response

```json
{
    "status": 201,
    "message": "Category added successfully!",
    "data": {
        "_id": "5fb25259256c3e0e34a384c6",
        "categoryName": "romance",
        "description": "These are poems filled with love stories",
        "coverPhoto": "https://ubusizi-images.s3.us-east-2.amazonaws.com/b2ee9452-a940-4a80-aee2-af236a8bf639.png",
        "__v": 0
    }
}

```
### 39. Admin Add New Color: POST Request

End Point

```
/api/v1/color/new
```

Body

```json
{
    "colorName":"red"
}

Response

```json
{
    "status": 201,
    "message": "Color added successfully!",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "red",
        "__v": 0
    }
}
```

### 40. Admin Fetch All Colors: Get Request

End Point

```
/api/v1/color/all
```

Response

```json
{
    "status": 200,
    "message": "Fonts",
    "data": [
        {
            "_id": "5fb3d81507594c01f83c4d28",
            "fontName": "red",
            "__v": 0
        },
    ]
}
```
### 41. Admin Fetch Single Color: Get Request

```
Endpoint
```

/api/v1/color/single/:id

Response

```json
{
    "status": 200,
    "message": "Color fetched",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "red",
        "__v": 0
    }
}
```
### 42. Admin Update color: put Request

```
/api/v1/color/update/:id
```
Body

```json
{
    "colorName":"blue"
}

Response

```json
{
    "status": 200,
    "message": "Color updated",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "blue",
        "__v": 0
    }
}
```
### 43. Admin Add New Font: POST Request

End Point

```
/api/v1/font/new
```

Body

```json
{
    "fontName":"Times-New-Roman"
}

Response

```json
{
    "status": 201,
    "message": "Font added successfully!",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "Times-New-Roman",
        "__v": 0
    }
}
```

### 44. Admin Fetch All Fonts: Get Request

End Point

```
/api/v1/font/all
```

Response

```json
{
    "status": 200,
    "message": "Fonts",
    "data": [
        {
            "_id": "5fb3d81507594c01f83c4d28",
            "fontName": "Times-New-Roman",
            "__v": 0
        },
        {
            "_id": "5fb3d85007594c01f83c4d29",
            "fontName": "cabrili",
            "__v": 0
        }
    ]
}
```
### 45. Admin Fetch Single Font: Get Request

```
Endpoint
```

/api/v1/font/single/:id

Response

```json
{
    "status": 200,
    "message": "Font fetched",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "italic",
        "__v": 0
    }
}
```
### 46. Admin Update Font: put Request

```
/api/v1/font/update/:id
```
Body

```json
{
    "fontName":"Changli"
}

Response

```json
{
    "status": 200,
    "message": "Font updated",
    "data": {
        "_id": "5fb3d85007594c01f83c4d29",
        "fontName": "changli",
        "__v": 0
    }
}
```
### 47. Update Category: Put Request

End Point

```
/api/v1/category/5fb391ccae19fb1d8437f660/update
```

Body:
![Image](https://user-images.githubusercontent.com/67208024/99372368-57fd9300-28c0-11eb-904c-6f2345ebdda2.png)

```json
{
    "status": 200,
    "message": "Category  successfully updated!",
    "data": {
        "_id": "5fb391ccae19fb1d8437f660",
        "categoryName": "Dramatic",
        "description": "This is for Romance and love stories",
        "coverPhoto": "https://ubusizi-images.s3.us-east-2.amazonaws.com/a5197902-d7a4-406e-b9bf-84c24eedbd8a.jpg",
        "__v": 0
    }
}
```
### 48. Admin fetch all categories: Get Request

End Point 
```
/api/v1/category/all
```

Response 
```json
{
    "status": 200,
    "message": "Categories fetched",
    "data": [
        {
            "_id": "5fb2d6513d3e10288407ba9f",
            "categoryName": "romance",
            "description": "It contains love stories",
            "coverPhoto": "https://ubusizi-images.s3.us-east-2.amazonaws.com/78ffae35-3d51-41fc-9235-1af30095f3fc.JPG",
            "__v": 0
        }
    ]
}
```
### 49. Fetch recent posts: Get Request

End Point

```
/api/v1/users/recent-activities
```

Response
```json
{
    "status": 200,
    "message": "Posts",
    "data": [
        {
            "profilePicture": "none",
            "_id": "5fc394913d171d1a38a46cac",
            "username": "sharifbxysharifbxy8742"
        },
        {
            "profilePicture": "none",
            "_id": "5fc390c479b7a90928595497",
            "username": "sharifbsharifb2749"
        },
        {
            "profilePicture": "none",
            "_id": "5fc38bfbfe77f621583eb28e",
            "username": "marcustrashfordtx492"
        },
        {
            "profilePicture": "https://ubusizi-images.s3.us-east-2.amazonaws.com/c2ef4c3d-39af-40c2-af8f-b74c66cd59cd.JPG",
            "_id": "5f7e031e5da6a62164291133",
            "username": "marcusrashford8731"
        }
    ]
}
```

### 50. Suggestions: GET Request

End Point
```
/users/suggestions
```

Response
```json
{
    "status": 200,
    "message": "Users",
    "data": [
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc010e8b01907002fbf42b6",
            "firstname": "dhjsbj",
            "lastname": "smfksfs",
            "username": "jnda",
            "email": "asdk@gmail.com",
            "createdAt": "2020-11-26T20:32:40.526Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc00e7c670f95002f8cc30b",
            "firstname": "skdm",
            "lastname": "af ",
            "username": "ankf",
            "email": "aksmla@gnmail.com",
            "createdAt": "2020-11-26T20:22:20.047Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc12bc71856f9002ffeb28b",
            "firstname": "mudu",
            "lastname": "jjejeje",
            "username": "kekekekdieded",
            "email": "dkdeud83h@gmail.com",
            "createdAt": "2020-11-27T16:39:35.447Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc131db1856f9002ffeb292",
            "firstname": "kkkkkkkk",
            "lastname": "sssssssssss",
            "username": "sssssss",
            "email": "kkkk@gmail.com",
            "createdAt": "2020-11-27T17:05:31.737Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "true",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fa308d0cc91c6002f9747f7",
            "firstname": "degea",
            "lastname": "degea",
            "email": "degea@gmail.com",
            "username": "degeadegea3662",
            "createdAt": "2020-11-04T20:02:24.729Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc4af547c50ce002ff2755c",
            "firstname": "habimana",
            "lastname": "sharif",
            "username": "sharif7",
            "email": "hdidiersharif@gmail.com",
            "createdAt": "2020-11-30T08:37:40.428Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc00e10670f95002f8cc30a",
            "firstname": "skjp",
            "lastname": "ppkp",
            "username": "aksnf.",
            "email": "po1@gmail.com",
            "createdAt": "2020-11-26T20:20:32.165Z",
            "__v": 0
        },
        {
            "profilePicture": "none",
            "isVerified": "false",
            "isPoet": "false",
            "bio": "**No Biography**",
            "_id": "5fc0120fb01907002fbf42b7",
            "firstname": "edfghjk",
            "lastname": "tgh  jkl",
            "username": "fghjk",
            "email": "gfhjkl@gmail.com",
            "createdAt": "2020-11-26T20:37:35.441Z",
            "__v": 0
        }
    ]
}
```

### 51. Activity: GET Request

End Point
```
/users/activity
```

Response
```json
{
    "status": 200,
    "message": "Recent activities",
    "data": [
        {
            "_id": "5fdc78b161c0ea30283cfaaf",
            "owner": "5fc87b63a149c6002f46f66f",
            "type": "Comment",
            "description": "klazer10 commented on your post",
            "user": "5fca88d62f40c3002ffaf9f2",
            "userPic": "none",
            "postId": "5fd664f09d4d1b002fda309a",
            "postContent": "Nyaruka Nyarukirayo!\n\nUmumbwirire azaze Ejo....\n\nAyiiiiweee ngo kandi nataza azapfireyooo\n\nNashaka anywe Nyabarongo cg se apfe uko nguko!\n\nEtc...",
            "postType": "Text",
            "comment": "Very good",
            "color": "light-orange",
            "createdAt": 1608284337522,
            "__v": 0
        },
        {
            "_id": "5fdc788b7125e33dd8fbe5d8",
            "owner": "5fc87b63a149c6002f46f66f",
            "type": "Like",
            "description": "klazer10 liked your post",
            "user": "5fca88d62f40c3002ffaf9f2",
            "userPic": "none",
            "postId": "5fd664f09d4d1b002fda309a",
            "postContent": "Nyaruka Nyarukirayo!\n\nUmumbwirire azaze Ejo....\n\nAyiiiiweee ngo kandi nataza azapfireyooo\n\nNashaka anywe Nyabarongo cg se apfe uko nguko!\n\nEtc...",
            "postType": "Text",
            "color": "light-orange",
            "createdAt": 1608284299064,
            "__v": 0
        },
        {
            "_id": "5fdbb4b53adde5233ccd077b",
            "owner": "5fc87b63a149c6002f46f66f",
            "type": "Follow",
            "user": "5fca88d62f40c3002ffaf9f2",
            "isFollowing": true,
            "userPic": "none",
            "description": "klazer10 started following you",
            "createdAt": 1608234431438,
            "__v": 0
        }
    ]
}
```