import {useSelector } from 'react-redux'

import {  selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import Spinner from '../../components/spinner/spinner.component'
import CollectionPage from './collection.component'

const CollectionPageContainer = () => {
    
    const isLoading = useSelector(selectIsCollectionsLoaded)

    return(
       !isLoading ? <Spinner/>
       :<CollectionPage/>
    )
}

export default CollectionPageContainer