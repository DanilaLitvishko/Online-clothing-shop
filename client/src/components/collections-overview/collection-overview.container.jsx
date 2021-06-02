import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import { selectorIsCollectionFetching} from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectorIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionOverviewContainer