import React from 'react';
import { useSelector, useDispatch  } from "react-redux";
import { logState } from "../slicers/authSlice";

const PerfilPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  dispatch(logState());

  return (
    <div>
      <div>{userId}</div>
    </div>
  );
};

export default PerfilPage;