import BoxHeader from "../../components/BoxHeader";
import DashboardBox from "../../components/DashboardBox";
import FlexBetween from "../../components/FlexBetween";
import { useGetKpisQuery, useGetTransactionsQuery } from '../../state/api';
import { Box, Typography, useTheme } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell
} from "recharts";


const MidColumn = () => {
  const { palette } = useTheme();
  const darkGreen= palette.mode === "dark" ? palette.primary[300] : palette.primary[800];
  const lightGreen = palette.mode === "dark" ? palette.primary[800] : palette.primary[300];
  const pieColors = [darkGreen, lightGreen];
  // const { data: kpiData } = useGetKpisQuery();
  // const { data: transactionData } = useGetTransactionsQuery();
  const greenColor = palette.mode === "dark" ? palette.primary[300] : palette.primary[700];

  const { data: kpiData, isLoading: kpiLoading } = useGetKpisQuery();
  const { data: transactionData, isLoading: transactionLoading } = useGetTransactionsQuery();

  // Render loading state if either query is still loading
  if (kpiLoading || transactionLoading) {
    return <div>Loading...</div>;
  }

  const ATV = () => {
    if (!kpiData || !transactionData) return null;

    const totalRevenue = kpiData[0].totalRevenue;
    const totalTransactions = transactionData.length;

    if (totalTransactions === 0) return 0;

    const ATV = totalRevenue / totalTransactions;
    return ATV.toFixed(2);
  };

  const UniqueUsersCount = () => {
    if (!transactionData) return null;
    const uniqueBuyers = new Set(transactionData.map(transaction => transaction.buyer));
    return uniqueBuyers.size;
  };

  const repeatRate = () => {
    interface PieData {
      name: string;
      value: number;
    }

    if (!transactionData) return [];

    const uniqueBuyers = new Set(transactionData.map(transaction => transaction.buyer));
    const buyerTransactionCounts: { [key: string]: number } = {};
    transactionData.forEach(transaction => {
      const buyer = transaction.buyer;
      buyerTransactionCounts[buyer] = (buyerTransactionCounts[buyer] || 0) + 1;
    });
    const repeatBuyers = Object.values(buyerTransactionCounts).filter(count => count > 1).length;
    const repeat_rate = (repeatBuyers / uniqueBuyers.size) * 100;
    const pieData: PieData[] = [
      { name: "Repeat Rate", value: parseFloat(repeat_rate.toFixed(2)) }, // Convert to number
      { name: "Remaining", value: parseFloat((100 - repeat_rate).toFixed(2)) }, // Convert to number
    ];
    return pieData;
  };


  return (
    <>
      <DashboardBox gridArea="e">
        <BoxHeader title="Yearly Stats" sideText="" />
        <FlexBetween mt="2rem" gap="1.5rem" pr="1rem">
          <Box ml="0.7rem" mt="-1.5rem" flexBasis="30%" textAlign="center">
            <Typography variant="h3">ATV</Typography>
            <Typography variant="h6">(Average Transaction Value)</Typography>
            <Typography m="0.3rem 0" variant="h3" color={greenColor}>
              ${ATV()}
            </Typography>
          </Box>
          <Box mt="0.2rem" flexBasis="30%" textAlign="center">
          <Typography variant="h4" fontWeight={800} textAlign='center'>
            <span>Customer Repeat Rate: </span>
            <span style={{ color: greenColor }}>{repeatRate()[0].value}%</span>
            </Typography>
          <div style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
            <PieChart
              width={100}
              height={80}
              margin={{
                top: 5,
                right: -10,
                left: 10,
                bottom: 0,
              }}
            >
              <Pie
                stroke="none"
                data={repeatRate()}
                innerRadius={28}
                outerRadius={38}
                paddingAngle={2}
                dataKey="value"
              >
                {repeatRate().map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          </Box>
          <Box mt="-1.5rem" flexBasis="30%" textAlign='center'>
            <Typography variant="h4" fontWeight={800} textAlign='center'> Number of Transactions</Typography>
            <Typography variant="h6">
              <span style={{ color: greenColor }}>75%</span>
              <span> of the yearly txs goal is achieved</span>
            </Typography>
            <Typography m="0.1rem 0" variant="h3" color={greenColor}>
              {transactionData?.length || 0}
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Total yearly active customers"
          sideText="50%"
        />
        <Box
          height="15px"
          margin="3rem 1rem 0.4rem 1rem"
          bgcolor={lightGreen}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={darkGreen}
            borderRadius="1rem"
            width="50%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          {(UniqueUsersCount())} unique customers have made a purchase this year. 
          The goal was to reach 500 unique customers by the end of the year.
        </Typography>
      </DashboardBox>

    </>
  );
}

export default MidColumn;