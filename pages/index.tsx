import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Loading from '../components/Loading'
import AuthenticatedApp from '../components/AppLogic/AuthenticatedApp'
import UnauthenticatedApp from '../components/AppLogic/UnauthenticatedApp'

// can't do this in ssr app
// const AuthenticatedApp = lazy(() => import('../components/AppLogic/AuthenticatedApp'))
// const UnauthenticatedApp = lazy(() => import('../components/AppLogic/UnauthenticatedApp'))

const IndexPage = () => {
  const { user, loading } = useFetchUser()

  if (loading) {
    return (<Loading />) // don't use Layout when user is not set yet (setObject(...)(...) of undefined error).
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default withApollo()(IndexPage)
