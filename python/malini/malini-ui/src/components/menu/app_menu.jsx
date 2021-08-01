import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MenuHeader from './menu_header';
import DueDetail from '../content/dues/due_detail';
import Customers from '../content/customer/Customers';
import CustomerArea from '../content/customer/CustomerArea';

import MenuDrawer from './menu_drawer';
import {drawerWidth} from './menu_const';


const menu_items = [
  {"title": "Customer Area","component": CustomerArea, "path": "/customer_areas", "icon": "", "divide": false}
  ,{"title": "Customers","component": Customers, "path": "/", "icon": "", "divide": false}
  ,{"title": "Due Detail","component": DueDetail, "path": "/due_detail", "icon": "", "divide": false}
                    ];

function AppMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  return (
    
    <div className={classes.root}>
      <MenuHeader onMenuIconClick = {()=> setOpen(!open)}  open={open}/>
      {/* <CssBaseline /> */}

      
      <Router>
        <MenuDrawer menu_items={menu_items} onMenuIconClick = {()=> setOpen(!open)}  open={open} />      
        <main className={clsx(classes.content, { [classes.contentShift]: open, })} >
          <div className={classes.drawerHeader} />
          <Switch>
            {menu_items.map(r => <Route path={r.path} exact component={r.component} key={r.title}/> )}
          </Switch>
        </main>
      </Router>
    </div>
    
  );
}

export default AppMenu;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  active:{background: '#ede7f6'},
  title_color:{ color: '#ede7f6'}
}));
