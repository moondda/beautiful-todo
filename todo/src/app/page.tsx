"use client";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

const onDragEnd = () => {
  //something
};

export default function Home() {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {initialData.columnOrder.map((columnId) => {
          const column =
            initialData.columns[columnId as keyof typeof initialData.columns];
          const tasks = column.taskIds.map(
            (taskId) =>
              initialData.tasks[taskId as keyof typeof initialData.tasks]
          );
          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </main>
    </DragDropContext>
  );
}
