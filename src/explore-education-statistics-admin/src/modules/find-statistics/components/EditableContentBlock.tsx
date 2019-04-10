import React, {Component} from 'react';
import {Release} from '../../../services/publicationService';
import EditableContentSubBlockRenderer from './EditableContentSubBlockRenderer';
import {Droppable} from "react-beautiful-dnd";

interface Props {
  content: Release['content'][0]['content'];
  id?: string;
}

class EditableContentBlock extends Component<Props> {
  render() {

    let {
      content,
      id = ''
    } = this.props;


    return content.length > 0 ? (
      <Droppable droppableId={`content-block-droppable-${id}`} type="content">

        {(provided, snapshot) => (

          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >


            {content.map((block, index) => (
              <EditableContentSubBlockRenderer
                block={block}
                key={`${index}-${block.heading}-${block.type}`}
                id={ id }
                index={index}
              />
            ))}

          </div>
        )}
      </Droppable>
    ) : (
      <div className="govuk-inset-text">
        There is no content for this section.
      </div>
    );
  }
}

export default EditableContentBlock;
