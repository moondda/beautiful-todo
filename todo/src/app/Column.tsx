import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const Column = (props) => {
  const { column, tasks } = props;
  return (
    <div>
      <div className="d">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 border border-gray-400"
          >
            {tasks.map((task, index) => (
              <div key={task.id} className="border border-gray-400">
                <Draggable draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-blue-300 p-2 mb-2"
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
