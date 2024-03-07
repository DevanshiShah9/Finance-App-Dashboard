/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';


const Row2 = () => {
  const { data } = useGetKpisQuery();
  return (
    <>
      <DashboardBox gridArea= "d"></DashboardBox>
      <DashboardBox gridArea= "e"></DashboardBox>
      <DashboardBox gridArea= "f"></DashboardBox>
    </>
  );
}

export default Row2;