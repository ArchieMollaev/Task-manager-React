import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/Task';
import Column from 'components/Column';
import CardDragPreview from 'components/DragLayer';
import NewListForm from 'components/NewListForm';
import classNames from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import './style.scss';

class ToDoList extends React.Component {
  state = {
    newListForm: false,
  }

  render = () => {
    const {
      deleteTask,
      editTask,
      switchStatus,
      lists,
      addColumn,
    } = this.props;

    const { newListForm } = this.state;

    return (
      <div id="todo-app" >
        <h1>Task manager</h1>
        <div id="to-do-list-columns">
          <CardDragPreview />
          {Object.keys(lists).map(name => (<Column
            columnName={name}
            key={name}
            className={name}
            title={name.split('_').join(' ')}
            tasks={lists[name.replace(' ', '')] || []}
            removeFunc={id => deleteTask({ status: name, id })}
            editFunc={data => editTask({ data, status: name })}
            switchFunc={objData => switchStatus(objData)}
          />))}
          <button
            type="button"
            className={classNames({ 'add-column': true, 'add-column-active': newListForm })}
            onClick={() => this.setState({ newListForm: true })}
          >
				  add list...
          </button>
          { newListForm &&
          <NewListForm
            closeFunc={() => this.setState({ newListForm: false })}
            onSubmit={(e) => { addColumn({ name: e.name.split(' ').join('_') }); this.setState({ newListForm: false }); }}
          />
				}
        </div>
      </div>
    );
  };
}

ToDoList.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  switchStatus: PropTypes.func.isRequired,
  lists: PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    taskName: PropTypes.string.isRequired,
    taskNotes: PropTypes.string.isRequired,
  }))).isRequired,
  addColumn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: state.getList,
});

ToDoList = DragDropContext(HTML5Backend)(ToDoList);

export default connect(mapStateToProps, actions)(ToDoList);
