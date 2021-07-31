import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DueDetail from '../content/dues/due_detail';
import Customers from '../content/customer/Customers';
import CustomerArea from '../content/customer/CustomerArea';

const drawerWidth = 240;

const menu_items = [
  {"title": "Customer Area","component": CustomerArea, "path": "/customer_areas", "icon": "", "divide": false}
  ,{"title": "Customers","component": Customers, "path": "/", "icon": "", "divide": false}
  ,{"title": "Due Detail","component": DueDetail, "path": "/due_detail", "icon": "", "divide": false}
                    ];

function AppMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  return (
    
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} >
        <Toolbar>
          <IconButton  onClick={() => setOpen(true)} color="inherit" aria-label="open drawer"  edge="start" className={clsx(classes.menuButton, open && classes.hide)} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title_color}> Malini </Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper}} >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu_items.map((mnu, index) => 
           <div key={index}>
              <ListItem button key={mnu.title} >
                <Link to={mnu.path} style={{textDecoration: 'inherit'}}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>    */ }
                  <ListItemText primary={mnu.title} button='true'/>
                </Link>
              </ListItem>
              {mnu.divide && <Divider key={index}/>}
           </div>
          )}
        </List>
        <Divider />

      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open, })} >
        <div className={classes.drawerHeader} />
          {menu_items.map(r => <Route path={r.path} exact component={r.component} key={r.title}/> )}
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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
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
