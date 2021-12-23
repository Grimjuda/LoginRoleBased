import {
  Bar,
  Bubble,
  Doughnut,
  HorizontalBar,
  Line,
  Pie,
  Polar,
  Radar
} from 'react-chartjs-2';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'

import {React} from 'react';
import { Wrapper } from '../../components';
import { mockChart } from '../../utils/mock';

const Charts = () => {
  
  const empresas = ['La fiera', 'Cosco' , 'Soriana','Lorem'];
  const sitiosweb = ['Bodega', 'Oxxo' , 'Bravo','New York Times'];
  return (
    
   
  <Wrapper>
   <Grid container direction='row' container spacing={6}   > <Grid item  lg={4} xs={12} sm={6} md={6}><Autocomplete
    disablePortal
    id="combo-box-demo1"
    options={empresas}
    sx={{ width: 400 }}
    renderInput={(params) => <TextField {...params} label="Sitio web" />}
  /> </Grid>
  <Grid item  lg={4} xs={12} sm={6} md={6} >
  <Autocomplete
    disablePortal
    id="combo-box-demo2"
    options={sitiosweb}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Empresa" />}
  /></Grid>
 
  <Grid item  lg={4} xs={12} sm={6} md={6} > <form  noValidate>
      <TextField
        id="date"
        label="Fecha"
        type="date"
        defaultValue="2021-12-23"
     
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form></Grid>
  

  
  </Grid>
    <Grid container spacing={1}>
    
      {mockChart.map((chart, index) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
          
          <Card>
            <CardHeader title={chart.title} subheader={chart.subtitle} />
            <CardContent>
              {chart.type === 'bar' && (
                <Bar
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'horizontalbar' && (
                <HorizontalBar
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'line' && (
                <Line
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'bubble' && (
                <Bubble
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'doughnut' && (
                <Doughnut
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'pie' && (
                <Pie
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'polar' && (
                <Polar
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
              {chart.type === 'radar' && (
                <Radar
                  data={chart.data}
                  height={chart.height}
                  options={chart.options}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Wrapper>
  )
              };

export default Charts;
