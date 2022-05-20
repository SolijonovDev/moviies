import { FC, useEffect } from "react";
import s from '../styles/components/loading.module.scss'

export const Loading: FC = () => {
  useEffect(()=>{
     window.scrollTo(0,0)
  },[])
  return (
    <div className={s.loading}>
      <h2 className={s.text}>Yuklanmoqda ... </h2>
    </div>
  );
};
