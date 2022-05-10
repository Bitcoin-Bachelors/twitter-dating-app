import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { concat, fromPromise } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { checkUserStatus } from "../lib/auth"

let accessToken = null

const requestAccessToken = async () => {
    if (accessToken) return

    const userResponse = await checkUserStatus()

    if (userResponse) {
        accessToken = userResponse.signInUserSession.idToken.jwtToken
    } else {
        return 'public'
    }
}

// remove cached token on 401 from the server
// const resetTokenLink = onError(({ networkError }) => {
//   if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
//     accessToken = null
//   }
// })
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) {
        const err = JSON.parse(JSON.stringify(networkError))
        switch (err.message) {
            case 'cannot start as connection_init failed with : Could not verify JWT: JWSError (CompactDecodeError Invalid number of parts: Expected 3 parts; got 1)':
                // handle refresh token here
                // currently you be logout
                console.error(err)
                //window.location = "/api/logout"
                break;
            default:
                break;
        }
    }
});

const createHttpLink = (headers) => {
    const httpLink = new HttpLink({
        uri: 'https://api.bitcoinbachelorstest.com/v1/graphql',
        credentials: 'include',
        headers, // auth token is fetched on the server side
        fetch,
    })
    return httpLink;
}


const createWSLink = () => {
    return new WebSocketLink(
        new SubscriptionClient('wss://api.bitcoinbachelorstest.com/v1/graphql', {
            lazy: true,
            reconnect: true,
            connectionParams: async () => {
                await requestAccessToken() // happens on the client
                return {
                    headers: {
                        authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                }
            },
        })
    )
}


export default function createApolloClient(initialState, headers) {
    const ssrMode = typeof window === 'undefined'
    let link
    if (ssrMode) {
        link = concat(errorLink, createHttpLink(headers)) // executed on server
    } else {
        link = concat(errorLink, createWSLink()) // executed on client
    }
    return new ApolloClient({
        ssrMode,
        link,
        cache: new InMemoryCache().restore(initialState),
    })
}