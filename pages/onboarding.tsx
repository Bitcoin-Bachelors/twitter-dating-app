// import { GetServerSideProps } from 'next'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'

import Loading from '../components/Loading'
import UnauthenticatedApp from '../components/AppLogic/UnauthenticatedApp'
import Layout from '../components/Layout'
import Onboarding from "../components/Onboarding/Onboarding";

const OnboardingPage = () => {
    const { user, loading } = useFetchUser()

    if (loading) {
        return (
            <Layout>
                <Loading />
            </Layout>)
    }

    return user ? (
        <Layout >
            <Onboarding />
        </Layout>
    ) : (<UnauthenticatedApp />)
}

export default withApollo()(OnboardingPage)