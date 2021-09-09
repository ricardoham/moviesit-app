import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReportData } from 'model/reportData';
import Chart from 'react-google-charts';

interface Props {
  dataReport?: ReportData
}

const ChartReport = ({ dataReport }: Props): JSX.Element => {
  const {
    profile, banComments, recommendations, favMovies, favPeople, waitList,
  } = { ...dataReport };

  return (
    <Box>
      <Chart
        style={{
          maxWidth: 600,
          height: 400,
        }}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Dados do Sistema', 'Total', 'Total mensal'],
          [`${profile?.name}`, profile?.total, profile?.currentMonthTotal],
          [`${banComments?.name}`, banComments?.total, banComments?.currentMonthTotal],
          [`${recommendations?.name}`, recommendations?.total, recommendations?.currentMonthTotal],
          [`${favMovies?.name}`, favMovies?.total, favMovies?.currentMonthTotal],
          [`${favPeople?.name}`, favPeople?.total, favPeople?.currentMonthTotal],
          [`${waitList?.name}`, waitList?.total, waitList?.currentMonthTotal],
        ]}
        options={{
          title: 'Dados do sistema atual',
          chartArea: { width: '60%' },
          hAxis: {
            title: 'Quantidade de dados',
            minValue: 0,
          },
          vAxis: {
            title: 'Categoria',
          },
        }}
      />
    </Box>
  );
};
export default ChartReport;
