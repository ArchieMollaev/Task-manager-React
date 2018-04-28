import React from 'react';
import { connect } from 'react-redux';
import TaskForm from 'components/Forms/app-forms/Task-form';
import Textarea from 'react-textarea-autosize';
import { DragSource } from 'react-dnd';
import * as actions from 'actions/Task';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import './style.scss';

const Types = {
  ITEM: 'card',
};

const cardSource = {
  canDrag(props) {
    return props.canDrag;
  },
  beginDrag(props) {
    const {
      dataID,
      position,
      titleValue,
      notesValue,
      status,
    } = props;

    return {
      data: {
        id: dataID,
        taskName: titleValue,
        taskNotes: notesValue,
      },
      currentStatus: status,
      currentPosition: position,
    };
  },
};

const collect = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  connectDragPreview: connector.dragPreview(),
  isDragging: monitor.isDragging(),
  canDrag: monitor.canDrag(),
});

class Card extends React.Component {
  componentDidMount = () => {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: false,
      });
    }
  }

  showForm = (editStatus, status, id, taskName, taskNotes) => (
    editStatus === id + status &&
    <TaskForm
      initialValues={{ taskName, taskNotes }}
      formId="editor"
      form="editor"
      submitBtnTitle="✔"
      onSubmit={this.props.submitFunc}
      placeholder1="add title..."
      placeholder2="add description here..."
    />
  )

  render = () => {
    const {
      editStatus,
      status,
      dataID,
      position,
      titleValue,
      notesValue,
      classCard,
      classTitle,
      classNote,
      classRemove,
      classEdit,
      htmlFor,
      classLabel,
      checkerID,
      removeFunc,
      editFunc,
      isDragging,
      connectDragSource,
      injectorClass,
      injectorHoverFunc,
    } = this.props;

    return !isDragging && connectDragSource(<li>
      <div data-id={dataID} data-position={position} className={classCard}>
        <Textarea
          className={classTitle}
          type="text"
          value={titleValue}
          readOnly
        />
        <label htmlFor={htmlFor} className={classLabel}>
          <i className="fa fa-align-justify" aria-hidden="true" />
        </label>
        <input className="checker" type="checkbox" id={checkerID} />
        <Textarea
          className={classNote}
          type="text"
          value={notesValue}
          readOnly
        />
        <button type="button" className={classRemove} onClick={removeFunc}>
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
        <button className={classEdit} type="button" onClick={editFunc}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        {this.showForm(editStatus, status, dataID, titleValue, notesValue)}
      </div>
      <div
        className={injectorClass}
        onDragOver={injectorHoverFunc}
      />
      </li>);
  }
}

Card.propTypes = {
  editStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dataID: PropTypes.number.isRequired,
  titleValue: PropTypes.string.isRequired,
  notesValue: PropTypes.string,
  classCard: PropTypes.string.isRequired,
  classTitle: PropTypes.string.isRequired,
  classNote: PropTypes.string.isRequired,
  classRemove: PropTypes.string.isRequired,
  classEdit: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  classLabel: PropTypes.string.isRequired,
  checkerID: PropTypes.string.isRequired,
  removeFunc: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  submitFunc: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  injectorHoverFunc: PropTypes.func.isRequired,
  injectorClass: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

class CardDndConnected extends DragSource(Types.ITEM, cardSource, collect)(Card) {}

export default connect(null, actions)(CardDndConnected);
