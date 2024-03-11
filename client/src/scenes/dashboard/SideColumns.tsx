import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';

const Row3 = () => {
  const { data } = useGetKpisQuery();
  console.log("data",data);
  return (
    <>
      <DashboardBox gridArea= "d"></DashboardBox>
      <DashboardBox gridArea= "f"></DashboardBox>
    </>
  );
}

export default Row3;