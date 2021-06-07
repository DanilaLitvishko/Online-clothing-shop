import { useSelector } from 'react-redux'

import {  selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import { selectorIsCollectionFetching} from '../../redux/shop/shop.selectors'
import Spinner from '../../components/spinner/spinner.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

const CollectionOverviewContainer = () => {
    
    const isLoading = useSelector(selectIsCollectionsLoaded)

    return(
       !isLoading ? <Spinner/>
       :<CollectionsOverview/>
    )
}


export default CollectionOverviewContainer