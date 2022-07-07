import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: ID
        username: String
    }
    
    type Tweet {
        id: ID
        text: String
        author: User
    }

    type Query {
        allTweets: [Tweet]
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(userId: ID!, text: String): Tweet
        deleteTweet(id: ID!): Boolean
    }
`;

// Query : Restful API에서 url 역할 (어떤 데이터를 가져올래?)
// Mutation : Restful API에서 HTTP Method 역할 (데이터를 어떻게 수정할래? POST / PUT / FATCH / DELETE)
// 기본적으로 모든 타입은 Nullable 이다. Non-Nullable을 원한다면 ! 붙이기

const server = new  ApolloServer({typeDefs});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});