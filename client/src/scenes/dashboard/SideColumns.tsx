// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo } from 'react';
import BoxHeader from "../../components/BoxHeader";
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from 'recharts';



const SideColumns = () => {
  const { palette } = useTheme();
  const { data: productData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();
  const greenColor = palette.mode === "dark" ? palette.primary[300] : palette.primary[700];

  const sortedProducts = useMemo(() => {
    if (!productData) return [];
    return productData
      .map(product => ({
        _id: product._id,
        unitsSold: product.transactions.length
      }))
      .sort((a, b) => b.unitsSold - a.unitsSold);
  }, [productData]);

  const top10Products = sortedProducts.slice(0, 10);

  const top10ProductsData = useMemo(() => {
    if (!productData) return [];
    const top10productsAllColumns =  top10Products.map((topProduct: { _id: string; unitsSold: number; }) => {
      const matchingProduct = productData.find(product => product._id === topProduct._id);
      if (!matchingProduct) return [];
      return {
        ...topProduct,
        price: matchingProduct.price,
        expense: matchingProduct.expense,
        total_revenue: matchingProduct.price * topProduct.unitsSold,
        total_expense: matchingProduct.expense * topProduct.unitsSold
      };
    });
    return top10productsAllColumns;
  }, [top10Products, productData]);

  const RevenueDistribution = useMemo(() => {
    return [
      { name: "Expenses", value: parseInt(kpiData[0].totalExpenses), color: palette.tertiary[500]},
      { name: "Profit", value: parseInt(kpiData[0].totalProfit), color: greenColor }
    ];
  } ,[greenColor, kpiData, palette]);
  

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "unitsSold",
      headerName: "Units Sold",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    
  ];
  
  return (
    <>
      <DashboardBox gridArea="d">
      <BoxHeader
          title="List of Top 10 Popular Products"
          subtitle='Top 10 Products that have been sold the most in the current year'
          sideText={`${top10ProductsData?.length} products`}
        />
        <Box
          mt="2.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={top10ProductsData || []}
            columns={productColumns}
            getRowId={(row) => row._id} 
          />
        </Box>
        </DashboardBox>
      <DashboardBox gridArea="f">
      <BoxHeader
          title="Revenue-Profit-Expense Distribution"
          subtitle='Total Profit and Expense Distribution for the current year'
          sideText={((kpiData[0].totalProfit/kpiData[0].totalRevenue)*100).toFixed(2) + '% profit'}
      />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={RevenueDistribution}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill={palette.tertiary[500]}
            label={(entry) => `$${entry.value} (${entry.name})`}
          >
          {
                RevenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default SideColumns;