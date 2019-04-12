import React from 'react';
import { connect } from 'react-redux';
// import TaskForm from 'components/Forms/app-forms/Task-form';
import Textarea from 'react-textarea-autosize';
import { DragSource } from 'react-dnd';
import * as actions from 'actions/common';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

const Types = {
  ITEM: 'card'
};

const cardSource = {
  canDrag(props) {
    return props.canDrag;
  },
  beginDrag({ id, title, description, position }) {
    return {
      id,
      position,
      title,
      description
    };
  }
};

const collect = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  connectDragPreview: connector.dragPreview(),
  isDragging: monitor.isDragging(),
  canDrag: monitor.canDrag()
});

class Card extends React.Component {
  componentDidMount = () => {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: false
      });
    }
  };

  render = () => {
    const { id, position, title, description, isDragging, connectDragSource } = this.props;

    return (
      !isDragging &&
      connectDragSource(
        <li>
          <div data-id={id} data-position={position}>
            <Textarea type="text" value={title} readOnly />
            <span>
              <i className="fa fa-align-justify" aria-hidden="true" />
            </span>
            <input className="checker" type="checkbox" />
            <Textarea type="text" value={description || ''} readOnly />
            <button type="button" onClick={() => {}}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
            <button className="sdas" type="button" onClick={() => {}}>
              <i className="fa fa-pencil" aria-hidden="true" />
            </button>
          </div>
        </li>
      )
    );
  };
}

class CardDndConnected extends DragSource(Types.ITEM, cardSource, collect)(Card) {}

export default connect(
  null,
  combineActions(actions)
)(CardDndConnected);
