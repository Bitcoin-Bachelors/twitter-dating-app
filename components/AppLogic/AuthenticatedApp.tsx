
import { withApollo } from '../../lib/withApollo'
import Layout from '../Layout'
import Prospects from '../Prospects/Prospects'

const AuthenticatedApp = () => {
    return (
        <Layout currentPage="/prospects">
            <Prospects />
        </Layout>
    )
}

export default withApollo()(AuthenticatedApp)