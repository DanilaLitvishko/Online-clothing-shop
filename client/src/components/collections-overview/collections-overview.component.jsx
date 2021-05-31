import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'

import CollectionPreview from '../../components/collection-preview/collection-preview.component'
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({collections}) => (
    <CollectionsOverviewContainer>
        <div className='collections-overview'>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    </CollectionsOverviewContainer>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)