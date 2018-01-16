import React from 'react';
import { DragLayer } from 'react-dnd';
import './style.scss';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10,
  left: 0,
  top: 0,
  transform: 'rotate(3deg)',
};

const getItemStyles = (props) => {
  const { currentOffset } = props;
  if (!currentOffset) { return { display: 'none' }; }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    background: 'white',
    width: '300px',
    color: 'grey',
    borderRadius: '4px',
    padding: '10px 15px',
    fontFamily: 'calibri',
    wordWrap: 'break-word',
    border: '1px solid #ddd',
    WebkitBoxShadow: '0px 2px 14px 1px rgba(0,0,0,0.24)',
	  MozBoxShadow: '0px 2px 14px 1px rgba(0,0,0,0.24)',
    boxShadow: '0px 2px 14px 1px rgba(0,0,0,0.24)',
  };
};

const CardPreview = (props) => {
  const { item } = props;
  const renderItem = () => (
    <div className="drag-layer">{ item.data.taskName }<i className="fa fa-pencil" aria-hidden="true" /></div>
  );

  const { isDragging } = props;

  return isDragging &&
  <div className="drag-layer" style={layerStyles}>
    <div style={getItemStyles(props)}>
      { renderItem(props) }
    </div>
  </div>;
};

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

export default DragLayer(collect)(CardPreview);
