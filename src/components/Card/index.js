import React from 'react';
import { connect } from 'react-redux';
import Form from 'components/ReduxForm';
import { submit } from 'redux-form';
import Textarea from 'react-textarea-autosize';
import { DragSource } from 'react-dnd';
import DragPreview from 'components/DragLayer';
import * as actions from 'actions/Task';
import { getEmptyImage } from 'react-dnd-html5-backend';
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
      titleValue,
      notesValue,
      status,
      connectDragPreview,
    } = props;

    return {
      id: dataID,
      data: {
        taskName: titleValue,
        taskNotes: notesValue,
      },
      currentStatus: status,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag(),
  };
}

class Card extends React.Component {
  componentDidMount = () => {
    this.props.connectDragPreview &&
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: false,
    });
  }

  showForm = (editStatus, status, id, taskName, taskNotes) => (
    editStatus === id + status &&
    <Form
      initialValues={{ taskName, taskNotes }}
      formId="editor"
      form="editor"
      f1name="taskName"
      f2name="taskNotes"
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
      switchFunc,
      submitFunc,
      isDragging,
      canDrag,
      connectDragSource,
      connectDragPreview,
      dragStatus,
    } = this.props;

    return (
      <li>
        { connectDragSource(<div>
          {!isDragging &&
          <div
            data-id={dataID}
            className={classCard}
          >
            <Textarea
              className={classTitle}
              type="text"
              value={titleValue}
              readOnly
            />
            <label
              htmlFor={htmlFor}
              className={classLabel}
            >notes
            </label>
            <input
              className="checker"
              type="checkbox"
              id={checkerID}
            />
            <Textarea
              className={classNote}
              type="text"
              value={notesValue}
              readOnly
            />
            <span
              className={classRemove}
              onClick={removeFunc}
            ><i className="fa fa-trash-o" aria-hidden="true" />
            </span>
            <button
              className={classEdit}
              type="button"
              onClick={editFunc}
            >
            edit
            </button>
            {	this.showForm(editStatus, status, dataID, titleValue, notesValue) }
          </div>
          }
        </div>) }
      </li>
    );
  }
}

Card = DragSource(Types.ITEM, cardSource, collect)(Card);

export default connect(null, actions)(Card);
