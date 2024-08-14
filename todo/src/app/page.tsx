"use client";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export default function Home() {
  const [dndData, setDndData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    )
      return;

    const column =
      dndData.columns[source.droppableId as keyof typeof dndData.columns];
    const newTasksIds = Array.from(column.taskIds);
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTasksIds,
    };

    const newState = {
      ...dndData,
      columns: {
        ...dndData.columns,
        [newColumn.id]: newColumn,
      },
    };

    setDndData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {dndData.columnOrder.map((columnId) => {
          const column =
            dndData.columns[columnId as keyof typeof dndData.columns];
          const tasks = column.taskIds.map(
            (taskId) => dndData.tasks[taskId as keyof typeof dndData.tasks]
          );
          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </main>
    </DragDropContext>
  );
}
