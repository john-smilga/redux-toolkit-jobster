import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return <h1>Stats</h1>;
};
export default Stats;
