import React from 'react';
import { DragLayer } from 'react-dnd';


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10,
  left: 0,
  top: 0,
  transform: 'rotate(3deg)',
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    background: 'grey',
    width: '300px',
    color: 'white',
    opacity: '0.9',
    padding: '10px 15px',
    fontFamily: 'calibri',
    wordWrap: 'break-word',
    WebkitBoxShadow: '0px 2px 1px 1px rgba(0,0,0,0.07)',
	  MozBoxShadow: '0px 2px 1px 1px rgba(0,0,0,0.07)',
    boxShadow: '0px 2px 1px 1px rgba(0,0,0,0.07)',
  };
}

class CardPreview extends React.Component {
  renderItem(props) {
    return (
      <div>{ props.item.data.taskName }</div>
    );
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          { this.renderItem(this.props) }
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(CardPreview);
