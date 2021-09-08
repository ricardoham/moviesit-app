import { ReportData } from 'model/reportData';
import React from 'react';
import Chart from 'react-google-charts';

interface Props {
  dataReport?: ReportData
}

const ChartReport = ({ dataReport }: Props): JSX.Element => {
  const {
    profile, banComments, recommendations, favMovies, favPeople, waitList,
  } = { ...dataReport };

  return (
    <Chart
      width="100%"
      height="400px"
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
  );
};
export default ChartReport;
