import { ApolloServer, gql } from 'apollo-server';

let tweets = [
    {
        id: "1",
        text: '@하이',
    },
    {
        id: "2",
        text: '@맛스타그램',
    },
    {
        id: "3",
        text: '@바리스타',
    },
    {
        id: "4",
        text: '@여행',
    },
];

// 타입 정의
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
    }
    
    type Tweet {
        id: ID!
        text: String!
        author: User!
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(userId: ID!, text: String!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

// Query : Restful API에서 url 역할 (어떤 데이터를 가져올래? GET)
// Mutation : Restful API에서 HTTP Method 역할 (데이터를 어떻게 수정할래? POST / PUT / FATCH / DELETE)
// 기본적으로 모든 데이터는 Nullable 이다. (id: ID! === id: ID | null) 만약에 Non-Nullable을 원한다면 타입 옆에 ! 붙이기

// Response payload를 어떻게 줄건지 정의
const resolvers = {
    Query: {
        tweet(root, { id }) {
            return tweets.find(tweet => tweet.id === id);
        },
        allTweets() {
            return tweets;
        }
    },
    Mutation: {
        postTweet(_, { userId, text }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find((tweet) => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== id);
            return true;
        }
    }
}

const server = new  ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});