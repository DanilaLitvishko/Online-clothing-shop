import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .reduce((acc, item, idx) => {
          const newAcc = [...acc]
          if(idx < 4){
            newAcc.push(<CollectionItem key={item.id} item={item} />)
            return newAcc
          }
          return newAcc
        }, [])
      }
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);