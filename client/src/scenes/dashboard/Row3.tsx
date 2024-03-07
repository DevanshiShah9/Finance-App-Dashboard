import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';

const Row3 = () => {
  const { data } = useGetKpisQuery();
  console.log("data",data);
  return (
    <>
      <DashboardBox gridArea= "g"></DashboardBox>
      <DashboardBox gridArea= "h"></DashboardBox>
      <DashboardBox gridArea= "i"></DashboardBox>
      <DashboardBox gridArea= "j"></DashboardBox>
    </>
  );
}

export default Row3;