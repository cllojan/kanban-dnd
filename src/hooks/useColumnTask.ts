import { useCallback } from "react";
import { v4 as uuidv4} from 'uuid';
import { ColumnType } from "../utils/enums";
import { TaskModel } from "../utils/models";
import useTaskCollection from './useTaskCollection';
import { pickChakraRandomColor, swap } from "../utils/helpers";
const MAX_TASK_PER_COLUMN = 100;

function useColumnTask(column:ColumnType){
    const [tasks, setTasks] = useTaskCollection();
    const addEmptyTask = useCallback(() => {
        console.log("Add empty task ");
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            if(columnTasks.length > MAX_TASK_PER_COLUMN){
                console.log("too many task");
                return allTasks
            }
            const newColumnTask: TaskModel = {
                id:uuidv4(),
                title:`New ${column} task`,
                color:pickChakraRandomColor('.300'),
                column,
            }
            return {
                ...allTasks,
                [column]:[newColumnTask,...columnTasks],
            };
        });
    },[column,setTasks]);
    const updateTask = useCallback(
        (id:TaskModel['id'],updateTask:Omit<Partial<TaskModel>, 'id'>) => {
                console.log("update task");
                setTasks((allTasks) => {
                    const columnTasks = allTasks[column];
                    return {
                        ...allTasks,
                        [column]:columnTasks.map((task) => task.id===id?{...task,...updateTask}:task
                        ),
                    };
                });
            },
            [column,setTasks],
    );

    const deleteTask = useCallback((id:TaskModel['id']) => {
        console.log("removving task");
        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            return {
                ...allTasks,
                [column]:columnTasks.filter((task)=> task.id !=id),
            }
        })
    },[column,setTasks]);
    const dropTaskFrom = useCallback(
        (from:ColumnType, id:TaskModel["id"]) => {
            setTasks((allTasks) => {
                const fromColumnTasks = allTasks[from];
                const toColumnTasks = allTasks[column];
                const movingTask = fromColumnTasks.find((task) => task.id === id);
                console.log('moving task');

                if(!movingTask){
                    return allTasks;
                }
                return {
                    ...allTasks,
                    [from]:fromColumnTasks.filter((task ) => task.id !== id),
                    [column]:[{...movingTask, column}, ...toColumnTasks],

                }
            })
        },
        [column,setTasks],
        )

    const swapTasks = useCallback(
        (i:number, j:number) =>{
            console.log("swap")
            setTasks((allTasks) => {
                const columnTasks = allTasks[column];
                return {
                    ...allTasks,
                    [column]:swap(columnTasks,i,j),
                };
            });
        },

        [column,setTasks],
    )
    return{
        tasks:tasks[column],
        addEmptyTask,
        updateTask,
        deleteTask,
        dropTaskFrom,
        swapTasks
    }
}

export default useColumnTask;