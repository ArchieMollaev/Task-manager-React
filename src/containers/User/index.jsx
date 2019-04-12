import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, editTask, switchStatus, addColumn } from 'actions/common';
import Column from 'components/Column';
import CardDragPreview from 'components/DragLayer';
import NewColumnForm from 'components/Forms/app-forms/New-column-form';
import classNames from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

class User extends React.Component {
  state = {
    newListForm: false
  };

  componentWillMount() {
    if (!localStorage.token) {
      this.props.history.push('/');
    }
  }

  render = () => {
    const { columns } = this.props;

    const { newListForm } = this.state;
    return (
      <div id="todo-app">
        <div id="to-do-list-columns">
          <CardDragPreview />
          {columns.map(({ id, name, Cards }) => (
            <Column
              columnName={name}
              columnId={id}
              key={id}
              className={name}
              colTitle={name}
              tasks={Cards}
              removeFunc={id => {
                this.props.deleteTask({ status: name, id });
              }}
              editFunc={data => {
                this.props.editTask({ data, status: name });
              }}
              switchFunc={objData => {
                this.props.switchStatus(objData);
              }}
            />
          ))}
          <button
            type="button"
            className={classNames({ 'add-column': true, 'add-column-active': newListForm })}
            onClick={() => this.setState({ newListForm: true })}
          >
            add list...
          </button>
          {newListForm && (
            <NewColumnForm
              closeFunc={() => this.setState({ newListForm: false })}
              onSubmit={e => {
                this.props.addColumn({ name: e.name.split(' ').join('_') });
                this.setState({ newListForm: false });
              }}
            />
          )}
        </div>
      </div>
    );
  };
}

class UserDndConnected extends DragDropContext(HTML5Backend)(User) {}

export default connect(
  ({ columns }) => ({ columns }),
  combineActions({ deleteTask, editTask, switchStatus, addColumn })
)(UserDndConnected);
