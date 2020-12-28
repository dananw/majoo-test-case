import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const TodoSkeleton = (props) => {
  return(
    <>
      <Skeleton {...props}/>
      <Skeleton {...props}/>
    </>
  )
}
export default TodoSkeleton
