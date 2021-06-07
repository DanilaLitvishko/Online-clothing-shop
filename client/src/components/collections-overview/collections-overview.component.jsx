import React from 'react'
import {useSelector} from 'react-redux'

import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'

import CollectionPreview from '../../components/collection-preview/collection-preview.component'
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = () => {
    const collections =  useSelector(selectCollectionsForPreview)
    return(
    <CollectionsOverviewContainer>
        <div className='collections-overview'>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    </CollectionsOverviewContainer>
)}

export default CollectionsOverview