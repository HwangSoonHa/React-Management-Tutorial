import React,{Component}  from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { render } from '@testing-library/react';


const styles = theme => ({
  root:{
    width:'100%',
    marginTop:theme.spacing(3),
    overflowX:"auto"
  },
  table : {
    minWidth:1080
  },
  progress: {
    margin:theme.spacing(2)
  }
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      custoemrs:'',
      completed:0
    }
  }

  stateRefresh = () => { // 변경된 정보만 업데이트 되도록.(SPA에선 페이지 전체가 새로고침되면 문제가 생김.)
    this.setState({
      customers: '',
      completed: 0
    });

    this.callApi()
    .then(res => this.setState({customers:res})) //실행이 될 경우
    .catch(err => console.log(err)); //오류가 날 경우
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers:res})) //실행이 될 경우
      .catch(err => console.log(err)); //오류가 날 경우
  }

  callApi = async()=>{
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({
      completed:completed >= 100 ? 0 : completed+1
    })
  }

  render(){
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer 
                    stateRefresh={this.stateRefresh}
                    key = {c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday = {c.birthday}
                    gender = {c.gender}
                    job={c.job}
                  />
                );
              }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
